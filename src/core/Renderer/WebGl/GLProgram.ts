import { GLShader } from "./GLShader";
import { WebGl } from "./WebGl";

export class GLProgram {
  static currentProgram?: GLProgram;
  program: WebGLProgram;
  name: string;
  constructor(name: string, vertexShader: GLShader, fragmentShader: GLShader) {
    this.name = name;
    const gl = WebGl.gl;
    const program = gl.createProgram();
    this.program = program;
    gl.attachShader(program, vertexShader.shader);
    gl.attachShader(program, fragmentShader.shader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    gl.useProgram(null);
  }

  deleteProgram() {
    const gl = WebGl.gl;
    gl.deleteProgram(this.program);
    GLProgram.currentProgram = undefined;
  }

  use() {
    const gl = WebGl.gl;
    gl.useProgram(this.program);
    GLProgram.currentProgram = this;
  }

  getUniformLocation(name: string) {
    const gl = WebGl.gl;
    return gl.getUniformLocation(this.program, name);
  }

  unUse() {
    const gl = WebGl.gl;
    gl.useProgram(null);
    GLProgram.currentProgram = undefined;
  }
}
