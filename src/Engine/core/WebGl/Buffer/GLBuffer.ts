import { IGLBufferInfo } from "./types/IGLBufferInfo";
import { convertBufferData } from "./utils/convertBufferData";
import { IDataType } from "../IDataType";
import { WebGl } from "../WebGl";

export class GLBuffer {
  buffer: WebGLBuffer;
  type: IDataType;
  size: number;
  data: number[];

  constructor(bufferInfo: IGLBufferInfo) {
    const gl = WebGl.gl;
    const _data = convertBufferData(bufferInfo.data, bufferInfo.type);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      _data,
      bufferInfo.options?.usage ?? gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.size = bufferInfo.size;
    this.type = bufferInfo.type;
    this.buffer = buffer;
    this.data = bufferInfo.data;
  }

  destroy() {
    const gl = WebGl.gl;
    gl.deleteBuffer(this.buffer);
  }

  bind() {
    const gl = WebGl.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
  }
}
