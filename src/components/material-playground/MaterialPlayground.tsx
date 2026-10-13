import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { initialMaterials, getThemePresets, shapeNames, type MaterialSettings } from './materials';
import { createPlayground } from './scene';
import './material-playground.css';

const controls: { key: Exclude<keyof MaterialSettings, 'color'>; label: string; min?: number; max?: number }[] = [
  { key: 'roughness', label: 'Roughness' },
  { key: 'metalness', label: 'Metalness' },
  { key: 'specular', label: 'Specular intensity' },
  { key: 'transmission', label: 'Glass / transmission' },
  { key: 'frost', label: 'Frosted feel' },
  { key: 'subsurface', label: 'Subsurface scattering' },
  { key: 'thickness', label: 'Thickness', min: 0, max: 3 },
  { key: 'ior', label: 'Refraction / IOR', min: 1, max: 2.33 },
  { key: 'clearcoat', label: 'Clearcoat' },
];

export default function MaterialPlayground() {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<ReturnType<typeof createPlayground> | null>(null);
  const [presets, setPresets] = useState(getThemePresets);
  const [materials, setMaterials] = useState(() => initialMaterials(getThemePresets()));
  const [selected, setSelected] = useState<number | null>(null);
  const [tool, setTool] = useState<'move' | 'rotate' | 'depth'>('move');
  const [spinning, setSpinning] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let previous = getThemePresets();
    const observer = new MutationObserver(() => {
      const next = getThemePresets();
      const before = previous;
      setPresets(next);
      // Follow the site's palette while retaining manually chosen colors and finishes.
      setMaterials(current => current.map(material => {
        const match = Object.keys(before).find(name => before[name].color === material.color);
        return match ? { ...material, color: next[match].color } : material;
      }));
      previous = next;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!host.current) return;
    let scene: ReturnType<typeof createPlayground> | undefined;
    let cancelled = false;
    // Defer initialization so StrictMode's rehearsal doesn't allocate a WebGL context.
    const timer = window.setTimeout(() => {
      if (cancelled || !host.current) return;
      try {
        scene = createPlayground(host.current, setSelected, () => setStatus('error'));
        api.current = scene;
        setStatus('ready');
      } catch (error) {
        console.error('Unable to initialize material playground', error);
        setStatus('error');
      }
    }, 0);
    return () => { cancelled = true; clearTimeout(timer); scene?.dispose(); api.current = null; };
  }, [attempt]);
  useEffect(() => { if (status === 'ready') api.current?.setMaterials(materials); }, [materials, status]);
  useEffect(() => { if (status === 'ready') api.current?.select(selected ?? -1); }, [selected, status]);
  useEffect(() => { if (status === 'ready') api.current?.setTool(tool); }, [tool, status]);
  useEffect(() => { if (status === 'ready') api.current?.setSpinning(spinning); }, [spinning, status]);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setSpinning(!query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  function patchMaterial(patch: Partial<MaterialSettings>) {
    setMaterials(previous => previous.map((value, i) => i === selected ? { ...value, ...patch } : value));
  }
  const current = selected === null ? null : materials[selected];
  return (
    <section className="material-playground" aria-label="3D material playground">
      <div className="material-playground__stage">
        <div className="material-playground__tools" aria-label="Scene controls">
          {(['move', 'rotate', 'depth'] as const).map(value => <button key={value} type="button" aria-pressed={tool === value} onClick={() => setTool(value)}>{value === 'move' ? 'Move' : value === 'rotate' ? 'Rotate' : 'Depth'}</button>)}
          <button type="button" aria-pressed={spinning} onClick={() => setSpinning(!spinning)}>{spinning ? 'Pause' : 'Play'}</button>
          <button type="button" onClick={() => { api.current?.reset(); setMaterials(initialMaterials(presets)); }}>Reset</button>
        </div>
        <div ref={host} className="material-playground__canvas" tabIndex={-1} />
        {status !== 'ready' && <div className="material-playground__status" role="status">
          {status === 'loading' ? 'Preparing the material studio…' : <><p>The 3D studio needs WebGL to run.</p><button type="button" onClick={() => { setStatus('loading'); setAttempt(a => a + 1); }}>Try again</button></>}
        </div>}
      {current && selected !== null && createPortal(<div id="material-inspector" className="material-playground material-playground__inspector" role="region" onKeyDown={event => { if (event.key === 'Escape') { setSelected(null); host.current?.focus(); } }} aria-label={`${shapeNames[selected]} material settings`}>
        <div className="material-playground__inspector-heading"><div><span className="label">Material editor</span><h2>{shapeNames[selected]}</h2></div><button type="button" onClick={() => setSelected(null)} aria-label="Close material editor">Close ×</button></div>
      <div className="material-playground__objects" aria-label="Select an object to edit">
        {shapeNames.map((name, i) => <button key={name} type="button" aria-pressed={selected === i} aria-controls="material-inspector" onClick={() => setSelected(i)} onKeyDown={event => {
          const direction = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[event.key];
          if (!direction) return;
          event.preventDefault(); setSelected(i); api.current?.nudge(i, tool === 'depth' ? 0 : direction[0], tool === 'depth' ? 0 : direction[1], tool === 'rotate', tool === 'depth' ? direction[1] || direction[0] : 0);
        }}><span className="material-playground__swatch" style={{ background: materials[i].color }} /><span>{name}</span><span className="material-playground__number">0{i + 1}</span></button>)}
      </div>
        <div className="material-playground__presets" aria-label="Material presets">{Object.entries(presets).map(([name, value]) => <button type="button" key={name} onClick={() => patchMaterial(value)}>{name}</button>)}</div>
        <div className="material-playground__parameters">
          <label className="material-playground__color"><span>Base color <output>{current.color.toUpperCase()}</output></span><input aria-label="Base color" type="color" value={current.color} onChange={e => patchMaterial({ color: e.target.value })} /></label>
          {controls.map(({ key, label, min = 0, max = 1 }) => <label key={key}><span>{label}<output>{current[key].toFixed(2)}</output></span><input type="range" min={min} max={max} step="0.01" value={current[key]} onChange={e => patchMaterial({ [key]: Number(e.target.value) })} /></label>)}
        </div>
        <p className="material-playground__hint">Move: drag left/right or up/down. Depth: drag up to bring closer, down to push away. Rotate: drag to turn. Shift + drag rotates; Alt + drag moves in depth. Arrow keys on a shape follow the selected mode. Each shape keeps its own material. Scattering is a real-time shader approximation; frost adds roughness and surface grain. Metalness reduces the visible glass effect.</p>
      </div>, document.body)}
      </div>
    </section>
  );
}
