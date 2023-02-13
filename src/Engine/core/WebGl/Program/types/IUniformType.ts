import { Matrix2x2 } from "../../../math/Matrix2x2";
import { Matrix3x3 } from "../../../math/Matrix3x3";
import { Matrix4x4 } from "../../../math/Matrix4x4";
import { Vector2 } from "../../../math/Vector2";
import { Vector3 } from "../../../math/Vector3";
import { Vector4 } from "../../../math/Vector4";

export type IUniformType<T> = T extends number
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
  ? "mat"
  : T extends Matrix3x3
  ? "mat"
  : T extends Matrix4x4
  ? "mat"
  : undefined;
