const pendingRelease = new WeakMap<HTMLCanvasElement, ReturnType<typeof setTimeout>>();

/**
 * Losing a WebGL context is not reversible, but React StrictMode mounts every
 * effect, cleans it up, then mounts it again in the same tick (dev only).
 * Deferring the actual loseContext() call lets the following mount cancel it
 * before it fires, while a genuine unmount (no follow-up mount) still frees
 * the context.
 */
export function scheduleWebGLContextRelease(
  canvas: HTMLCanvasElement,
  gl: WebGLRenderingContext | WebGL2RenderingContext | null | undefined
) {
  const timer = setTimeout(() => {
    pendingRelease.delete(canvas);
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  }, 0);
  pendingRelease.set(canvas, timer);
}

export function cancelWebGLContextRelease(canvas: HTMLCanvasElement) {
  const timer = pendingRelease.get(canvas);
  if (timer !== undefined) {
    clearTimeout(timer);
    pendingRelease.delete(canvas);
  }
}
