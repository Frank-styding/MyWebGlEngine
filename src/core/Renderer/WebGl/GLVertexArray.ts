import { GLBuffer, IGLBufferJSON } from "./GLBuffer";
import { GLElementBuffer, IGLElementBufferJson } from "./GlElementBuffer";
import { GLProgram } from "./GLProgram";
import { IDataType } from "./IDataType";
import { WebGl } from "./WebGl";
export type IBuffers = Record<
  string,
  {
    buffer: GLBuffer;
    options?: {
      offset: number;
      stride: number;
      normalized: boolean;
    };
  }
>;

export type IGLVertexArrayJSON = {
  buffers: Record<
    string,
    {
      buffer: IGLBufferJSON;
      options?: {
        offset: number;
        stride: number;
        normalized: boolean;
      };
    }
  >;
  elementBuffer?: IGLElementBufferJson;
};

export class GLVertexArray {
  vao: WebGLVertexArrayObject;
  buffers: IBuffers;
  elementBuffer?: GLElementBuffer;
  constructor(buffers: IBuffers, elementBuffer?: GLElementBuffer) {
    const gl = WebGl.gl;
    const vao = gl.createVertexArray();
    this.buffers = buffers;
    this.vao = vao;
    this.elementBuffer = elementBuffer;
  }

  bindElementBuffer() {
    if (!this.elementBuffer) return;
    console.log(this.elementBuffer);
    const gl = WebGl.gl;

    this.elementBuffer.bind();
  }

  bindBuffers(program: GLProgram) {
    const gl = WebGl.gl;
    Object.keys(this.buffers).forEach((key) => {
      const idx = gl.getAttribLocation(program.program, key);
      const bufferData = this.buffers[key];
      bufferData.buffer.bind();
      this.enablePointer(idx, {
        size: bufferData.buffer.size,
        type: this.convertType(bufferData.buffer.type),
        normalized: bufferData.options?.normalized ?? false,
        offset: bufferData.options?.offset ?? 0,
        stride: bufferData.options?.stride ?? 0,
      });
    });
  }

  convertType(type: IDataType) {
    const gl = WebGl.gl;
    switch (type) {
      case "float":
      case "float64":
        return gl.FLOAT;

      case "int8":
      case "int16":
      case "int32":
        return gl.INT;

      case "uint8":
      case "uint16":
      case "uint32":
        return gl.UNSIGNED_INT;
    }
  }

  bind() {
    const gl = WebGl.gl;
    gl.bindVertexArray(this.vao);
    this.bindElementBuffer();
    this.bindBuffers(GLProgram.currentProgram);
  }

  unBind() {
    const gl = WebGl.gl;
    gl.bindVertexArray(null);
  }

  enablePointer(
    idx: number,
    options: {
      size: number;
      type: number;
      stride: number;
      offset: number;
      normalized: boolean;
    }
  ) {
    const gl = WebGl.gl;
    gl.enableVertexAttribArray(idx);
    gl.vertexAttribPointer(
      idx,
      options.size,
      options.type,
      options.normalized,
      options.stride,
      options.offset
    );
  }

  draw(options: { offset?: number; first?: number; mode?: number } = {}) {
    const gl = WebGl.gl;
    if (this.elementBuffer) {
      gl.drawElements(
        options.mode ?? gl.TRIANGLES,
        this.elementBuffer.data.length,
        gl.UNSIGNED_SHORT,
        options.offset ?? 0
      );
    } else {
      const buffer = Object.values(this.buffers)[0].buffer;
      const count = buffer.data.length / buffer.size;
      gl.drawArrays(options.mode ?? gl.TRIANGLES, options.first ?? 0, count);
    }
  }

  static fromJson(json: IGLVertexArrayJSON) {
    const buffers: IBuffers = {};

    Object.keys(json.buffers).forEach((key) => {
      const bufferData = json.buffers[key];
      buffers[key] = {
        buffer: GLBuffer.fromJSON(bufferData.buffer),
        options: bufferData.options,
      };
    });

    let elementBuffer: undefined | GLElementBuffer = undefined;
    if (json.elementBuffer) {
      elementBuffer = GLElementBuffer.fromJson(json.elementBuffer);
    }

    return new GLVertexArray(buffers, elementBuffer);
  }
}
