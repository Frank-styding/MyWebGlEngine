import { WebGl } from "./WebGl";

export class GLShader {
  shader: WebGLShader;
  name: string;
  constructor(name: string, type: "vertex" | "fragment", source: string) {
    const gl = WebGl.gl;
    const shader = gl.createShader(
      type == "vertex" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER
    );

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
    }
    this.shader = shader;
    this.name = name;
  }

  deleteShader() {
    const gl = WebGl.gl;
    gl.deleteShader(this.shader);
  }
}
