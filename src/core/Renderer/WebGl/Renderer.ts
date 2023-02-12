import { GLProgram } from "./GLProgram";
import { GlTexture2D } from "./GlTexture";
import { GLUniform } from "./GLUniform";
import { GLVertexArray } from "./GLVertexArray";
import { WebGl } from "./WebGl";

export class GlRenderer {
  constructor(
    public program: GLProgram,
    public vertexArray: GLVertexArray,
    public uniform: Record<string, GLUniform> = {},
    public textures: GlTexture2D[] = []
  ) {}

  render() {
    const gl = WebGl.gl;
    gl.clearColor(0, 0, 0, 1);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    this.program.use();
    this.vertexArray.bind();

    this.textures.forEach((texture, i) => {
      texture.bind(i);
    });

    Object.keys(this.uniform).forEach((key) => {
      const uniform = this.uniform[key];
      const loc = this.program.getUniformLocation(key);
      uniform.use(loc);
    });

    this.vertexArray.draw();

    this.textures.forEach((texture, i) => {
      texture.unBind(i);
    });
    this.vertexArray.unBind();
    this.program.unUse();
  }
}
