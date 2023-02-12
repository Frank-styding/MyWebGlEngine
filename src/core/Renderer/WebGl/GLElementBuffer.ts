import { IDataType } from "./IDataType";
import { WebGl } from "./WebGl";

export type IGLElementBufferJson = {
  data: number[];
  usage?: number;
};

export class GLElementBuffer {
  buffer: WebGLBuffer;
  type: IDataType;
  size: number;
  data: number[];
  constructor(data: number[], usage?: number) {
    const gl = WebGl.gl;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(data),
      usage ?? gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    this.buffer = buffer;
    this.data = data;
  }

  destroy() {
    const gl = WebGl.gl;
    gl.deleteBuffer(this.buffer);
  }
  bind() {
    const gl = WebGl.gl;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
  }
  static fromJson(json: IGLElementBufferJson) {
    return new GLElementBuffer(json.data, json.usage);
  }
}
