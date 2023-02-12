export class WebGl {
  static gl: WebGL2RenderingContext;
  static init(
    canvas: HTMLCanvasElement,
    width: number = innerWidth,
    height: number = innerHeight
  ) {
    canvas.width = width;
    canvas.height = height;

    this.gl = canvas.getContext("webgl2");
    if (!this.gl) {
      throw new Error("WebGL not supported");
    }
  }
}
