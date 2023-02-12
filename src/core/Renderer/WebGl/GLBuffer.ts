import { IDataType } from "./IDataType";
import { WebGl } from "./WebGl";

export interface IGLBufferJSON {
  data: number[];
  type: IDataType;
  size: number;
  options?: {
    target: number;
    usage: number;
  };
}

export class GLBuffer {
  buffer: WebGLBuffer;
  type: IDataType;
  size: number;
  data: number[];
  constructor(
    bufferData: { data: number[]; type: IDataType; size: number },
    options?: { target: number; usage: number }
  ) {
    const gl = WebGl.gl;
    const target = options ? options.target : gl.ARRAY_BUFFER;
    const usage = options ? options.usage : gl.STATIC_DRAW;
    const _data = this.convertData(bufferData.data, bufferData.type);

    const buffer = gl.createBuffer();
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, _data, usage);
    gl.bindBuffer(target, null);

    this.size = bufferData.size;
    this.type = bufferData.type;
    this.buffer = buffer;
    this.data = bufferData.data;
  }

  convertData(data: number[], type: IDataType) {
    switch (type) {
      case "float":
        return new Float32Array(data);
      case "float64":
        return new Float64Array(data);
      case "int8":
        return new Int8Array(data);
      case "int16":
        return new Int16Array(data);
      case "int32":
        return new Int32Array(data);
      case "uint8":
        return new Uint8Array(data);
      case "uint16":
        return new Uint16Array(data);
      case "uint32":
        return new Uint32Array(data);
    }
  }

  destroy() {
    const gl = WebGl.gl;
    gl.deleteBuffer(this.buffer);
  }

  bind() {
    const gl = WebGl.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
  }

  static fromJSON(data: IGLBufferJSON) {
    return new GLBuffer(data, data.options);
  }
}
