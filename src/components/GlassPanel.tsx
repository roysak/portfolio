import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { defaultGlass, glassPresets, asteriskMaterials } from './glassMaterial';
import type { GlassSettings, NumericSetting } from './glassMaterial';

type Props = { settings: GlassSettings; onChange: (settings: GlassSettings) => void; onClose: () => void; onResetView: () => void; selected: number; onSelect: (index: number) => void };
export default function GlassPanel({ settings, onChange, onClose, onResetView, selected, onSelect }: Props) {
  const title = useRef<HTMLHeadingElement>(null);
  const id = useId();
  useEffect(() => { title.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [onClose]);
  const update = <K extends keyof GlassSettings>(key: K, value: GlassSettings[K]) => onChange({ ...settings, [key]: value });
  const range = (key: NumericSetting, label: string, min: number, max: number, step = 0.01) => <label className="glass-range" key={key} htmlFor={`${id}-${key}`}><span>{label}<output aria-hidden="true">{settings[key].toFixed(step >= 1 ? 0 : 2)}</output></span><input id={`${id}-${key}`} type="range" min={min} max={max} step={step} value={settings[key]} onChange={event => update(key, Number(event.target.value))} /></label>;
  const color = (key: 'color' | 'attenuationColor' | 'scatteringColor' | 'fresnelColor', label: string) => <label className="glass-color"><span>{label}</span><span><code>{settings[key]}</code><input type="color" value={settings[key]} onChange={event => update(key, event.target.value)} /></span></label>;
  return createPortal(<aside className="glass-panel" aria-labelledby={`${id}-title`}>
    <header><div><span className="eyebrow">INTERACTIVE MATERIAL LAB</span><h2 ref={title} tabIndex={-1} id={`${id}-title`}>A study in materials.</h2></div><button type="button" onClick={onClose} aria-label="Close material controls">×</button></header>
    <p className="glass-help">Drag an asterisk to nudge it. Shift-drag or choose Rotate to turn it. Drag empty space to orbit. Click to edit its material.</p>
    <label className="asterisk-select glass-select">Selected asterisk<select value={selected} onChange={event => onSelect(Number(event.target.value))}>{asteriskMaterials.map((item, index) => <option key={item.name} value={index}>{index + 1} / {item.name}</option>)}</select></label>
    <div className="glass-presets" aria-label="Material presets">{Object.entries(glassPresets).map(([name, preset]) => <button type="button" key={name} onClick={() => onChange({ ...defaultGlass, ...preset })}>{name}</button>)}</div>
    <div className="glass-panel-scroll">
      <details open><summary>01 / Surface & glass</summary><div className="glass-fields"><p className="glass-help">Choose Glass for clear refraction or Frosted for diffused glass. Both use full transmission and zero metalness.</p>{(settings.transmission === 0 || settings.metalness > 0.5) && <p className="glass-material-note">This surface is opaque or metallic. Select Glass to enable glass refraction.</p>}{color('color', 'Surface tint')}{range('metalness', 'Metalness', 0, 1)}{range('transmission', 'Transmission', 0, 1)}{range('roughness', 'Frost / roughness', 0, 1)}{range('thickness', 'Volume thickness', 0, 4)}{range('ior', 'Refraction index (IOR)', 1, 2.33)}{range('dispersion', 'Chromatic dispersion', 0, 1)}{color('attenuationColor', 'Absorption tint')}{range('attenuationDistance', 'Absorption distance', 0.1, 10, 0.1)}</div></details>
      <details><summary>02 / Reflections & environment</summary><div className="glass-fields">{range('reflection', 'Specular reflection', 0, 1)}{range('clearcoat', 'Surface clearcoat', 0, 1)}<label className="glass-select">Lighting environment<select value={settings.environment} onChange={event => update('environment', event.target.value)}><option value="studio">Softbox studio</option><option value="sunset">Warm sunset</option><option value="night">Midnight neon</option></select></label>{range('environmentIntensity', 'Environment light', 0, 3)}{range('environmentRotation', 'Environment rotation', 0, 360, 1)}<label className="glass-check"><input type="checkbox" checked={settings.backdrop} onChange={event => update('backdrop', event.target.checked)} />Preview selected environment</label><p className="glass-help">Lighting settings belong to this asterisk. The optional backdrop previews its environment across the scene.</p></div></details>
      <details><summary>03 / Fresnel edges</summary><div className="glass-fields"><p className="glass-help">Add an artistic edge tint over the glass’s natural, IOR-driven Fresnel reflections.</p>{range('fresnel', 'Edge intensity', 0, 2)}{range('fresnelPower', 'Edge falloff', 0.5, 8, 0.1)}{color('fresnelColor', 'Edge tint')}</div></details>
      <details><summary>04 / Subsurface scattering</summary><div className="glass-fields"><p className="glass-help">A real-time backlighting approximation for a soft, milky glow. Try the Frosted preset.</p>{range('scattering', 'Scattering strength', 0, 3)}{range('scatteringPower', 'Light concentration', 1, 12, 0.1)}{range('scatteringDistortion', 'Light wrap', 0, 1)}{color('scatteringColor', 'Scattering tint')}</div></details>
    </div>
    <footer><button type="button" onClick={() => onChange({ ...asteriskMaterials[selected].settings })}>Reset material ↺</button><button type="button" onClick={onResetView}>Reset view ↺</button></footer>
  </aside>, document.body);
}





