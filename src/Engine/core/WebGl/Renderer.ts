import { GLProgram } from "./Program/GLProgram";
import { GLTexture2D } from "./Texture/GLTexture2D";
import { GLUniform } from "./Program/GLUniform";
import { GLVertexArray } from "./VertexArray/GLVertexArray";
import { WebGl } from "./WebGl";

export class GlRenderer {
  constructor(
    public program: GLProgram,
    public vertexArray: GLVertexArray,
    public uniforms: Record<string, GLUniform> = {},
    public textures: GLTexture2D[] = []
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

    this.program.useUniforms(this.uniforms);

    this.vertexArray.draw();

    this.textures.forEach((texture, i) => {
      texture.unBind(i);
    });

    this.vertexArray.unBind();
    this.program.unUse();
  }
}
