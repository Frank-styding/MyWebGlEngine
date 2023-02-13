import { Matrix2x2 } from "../../../math/Matrix2x2";
import { Matrix3x3 } from "../../../math/Matrix3x3";
import { Matrix4x4 } from "../../../math/Matrix4x4";
import { Vector2 } from "../../../math/Vector2";
import { Vector3 } from "../../../math/Vector3";
import { Vector4 } from "../../../math/Vector4";

export type IUniformValues =
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
