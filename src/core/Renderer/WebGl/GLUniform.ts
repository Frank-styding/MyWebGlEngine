import { Matrix2x2 } from "../math/Matrix2x2";
import { Matrix3x3 } from "../math/Matrix3x3";
import { Matrix4x4 } from "../math/Matrix4x4";
import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { WebGl } from "./WebGl";

type IUniformType<T> = T extends number
  ? "float:1" | "int:1"
  : T extends [number]
  ? "float:1" | "int:1" | "vec:int:1" | "vec:float1"
  : T extends [number, number]
  ? "float:2" | "int:2" | "vec:float:2" | "vec:int:2"
  : T extends [number, number, number]
  ? "float:3" | "int:3" | "vec:float:3" | "vec:int:3"
  : T extends [number, number, number, number]
  ? "float:4" | "int:4" | "vec:float:4" | "vec:int:4"
  : T extends Vector2
  ? "int" | "float"
  : T extends Vector3
  ? "int" | "float"
  : T extends Vector4
  ? "int" | "float"
  : T extends Matrix2x2
  ? "matrix"
  : T extends Matrix3x3
  ? "matrix"
  : T extends Matrix4x4
  ? "matrix"
  : undefined;

type IUniformValues =
  | number
  | [number]
  | [number, number]
  | [number, number, number]
  | [number, number, number, number]
  | Matrix2x2
  | Matrix3x3
  | Matrix4x4
  | Vector4
  | Vector3
  | Vector2;

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

      case "matrix":
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
          gl.uniform2iv(loc, [value.x, value.y]);
        }
        if (value instanceof Vector3) {
          gl.uniform3iv(loc, [value.x, value.y, value.z]);
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
