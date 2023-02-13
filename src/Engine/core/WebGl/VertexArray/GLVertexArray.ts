import { GLBuffer } from "../Buffer/GLBuffer";
import { GLElementBuffer } from "../Buffer/GLElementBuffer";
import { GLProgram } from "../Program/GLProgram";
import { WebGl } from "..";
import { convertToWebGlType } from "./utils/convertToWebGLType";
import { IBuffers } from "./types/IBuffers";
import { IGLVertexArrayInfo } from "./types/IGLVertexArrayInfo";

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
    this.elementBuffer.bind();
  }

  bindBuffers(program: GLProgram) {
    Object.keys(this.buffers).forEach((key) => {
      const idx = WebGl.gl.getAttribLocation(program.program, key);
      const bufferData = this.buffers[key];
      bufferData.buffer.bind();
      this.enablePointer(idx, {
        size: bufferData.buffer.size,
        type: convertToWebGlType(bufferData.buffer.type),
        normalized: bufferData.options?.normalized ?? false,
        offset: bufferData.options?.offset ?? 0,
        stride: bufferData.options?.stride ?? 0,
      });
    });
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

  static fromData(json: IGLVertexArrayInfo) {
    const attributes: IBuffers = {};

    Object.keys(json.attributes).forEach((key) => {
      const bufferData = json.attributes[key];
      attributes[key] = {
        buffer: new GLBuffer(bufferData.buffer),
        options: bufferData.options,
      };
    });

    let elementBuffer: undefined | GLElementBuffer = undefined;
    if (json.indices) {
      elementBuffer = GLElementBuffer.fromJson(json.indices);
    }

    return new GLVertexArray(attributes, elementBuffer);
  }
}
