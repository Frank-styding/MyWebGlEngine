import { WebGl } from "..";
import { Matrix2x2 } from "../../math/Matrix2x2";
import { Matrix3x3 } from "../../math/Matrix3x3";
import { Matrix4x4 } from "../../math/Matrix4x4";
import { Vector2 } from "../../math/Vector2";
import { Vector3 } from "../../math/Vector3";
import { Vector4 } from "../../math/Vector4";
import { IUniformType } from "./types/IUniformType";
import { IUniformValues } from "./types/IUniformValues";

export class GLUniform<T extends IUniformValues = any> {
  constructor(public value: T, public type: IUniformType<T>) {}

  use(loc: WebGLUniformLocation) {
    const gl = WebGl.gl;

    const ArrayValue = this.value as number[];
    const value = this.value;

    switch (this.type) {
      case "float:1":
        gl.uniform1f(loc, value as number);
        break;
      case "float:2":
        gl.uniform2f(loc, ArrayValue[0], ArrayValue[1]);
        break;
      case "float:3":
        gl.uniform3f(loc, ArrayValue[0], ArrayValue[1], ArrayValue[2]);
        break;
      case "float:4":
        gl.uniform4f(
          loc,
          ArrayValue[0],
          ArrayValue[1],
          ArrayValue[2],
          ArrayValue[3]
        );
        break;
      case "int:1":
        gl.uniform1i(loc, value as number);
        break;
      case "int:2":
        gl.uniform2i(loc, ArrayValue[0], ArrayValue[1]);
        break;
      case "int:3":
        gl.uniform3i(loc, ArrayValue[0], ArrayValue[1], ArrayValue[2]);
        break;
      case "int:4":
        gl.uniform4i(
          loc,
          ArrayValue[0],
          ArrayValue[1],
          ArrayValue[2],
          ArrayValue[3]
        );
        break;
      case "vec:float:1":
        gl.uniform1fv(loc, ArrayValue);
        break;
      case "vec:float:2":
        gl.uniform2fv(loc, ArrayValue);
        break;
      case "vec:float:3":
        gl.uniform3fv(loc, ArrayValue);
        break;
      case "vec:float:4":
        gl.uniform4fv(loc, ArrayValue);
        break;

      case "vec:int:1":
        gl.uniform1iv(loc, ArrayValue);
        break;
      case "vec:int:2":
        gl.uniform2iv(loc, ArrayValue);
        break;
      case "vec:int:3":
        gl.uniform3iv(loc, ArrayValue);
        break;
      case "vec:int:4":
        gl.uniform4iv(loc, ArrayValue);
        break;

      case "mat":
        if (value instanceof Matrix2x2) {
          gl.uniformMatrix2fv(loc, false, new Float32Array(value.data));
        }
        if (value instanceof Matrix3x3) {
          gl.uniformMatrix3fv(loc, false, new Float32Array(value.data));
        }
        if (value instanceof Matrix4x4) {
          gl.uniformMatrix4fv(loc, false, new Float32Array(value.data));
        }
        break;
      case "int":
        if (value instanceof Vector2) {
          const _value = value as Vector2;

          gl.uniform2iv(loc, [_value.x, _value.y]);
        }
        if (value instanceof Vector3) {
          const _value = value as Vector3;

          gl.uniform3iv(loc, [_value.x, value.y, value.z]);
        }
        if (value instanceof Vector4) {
          gl.uniform4iv(loc, [value.x, value.y, value.z, value.w]);
        }
        break;

      case "float":
        if (value instanceof Vector2) {
          gl.uniform2fv(loc, [value.x, value.y]);
        }
        if (value instanceof Vector3) {
          gl.uniform3fv(loc, [value.x, value.y, value.z]);
        }
        if (value instanceof Vector4) {
          gl.uniform4fv(loc, [value.x, value.y, value.z, value.w]);
        }
        break;
    }
  }
}
