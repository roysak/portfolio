export function releaseWebGLContext(gl: WebGLRenderingContext | WebGL2RenderingContext | null | undefined) {
  gl?.getExtension('WEBGL_lose_context')?.loseContext();
}
