import { Vector4 } from "./Vector4";

type IMatrixData = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export class Matrix4x4 {
  constructor(public data?: IMatrixData) {
    this.data ??= Matrix4x4.identity().data;
  }

  mul(m: Matrix4x4) {
    this.data = Matrix4x4.mul(this, m).data;
    return this;
  }

  mulVec(v: Vector4) {
    return Matrix4x4.mulVec(this, v);
  }

  rotateX(a: number) {
    this.data = Matrix4x4.mul(this, Matrix4x4.rotateX(a)).data;
    return this;
  }

  rotateY(a: number) {
    this.data = Matrix4x4.mul(this, Matrix4x4.rotateY(a)).data;
    return this;
  }

  rotateZ(a: number) {
    this.data = Matrix4x4.mul(this, Matrix4x4.rotateZ(a)).data;
    return this;
  }

  scale(x: number, y: number, z: number) {
    this.data = Matrix4x4.mul(this, Matrix4x4.scale(x, y, z)).data;
    return this;
  }

  translate(x: number, y: number, z: number) {
    this.data = Matrix4x4.mul(this, Matrix4x4.translate(x, y, z)).data;
    return this;
  }

  transpose() {
    return Matrix4x4.transpose(this);
  }

  copy(m: Matrix4x4) {
    this.data = m.data;
    return this;
  }

  clone() {
    return new Matrix4x4(this.data);
  }

  static identity() {
    return new Matrix4x4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  static mul(a: Matrix4x4, b: Matrix4x4) {
    return new Matrix4x4([
      a.data[0] * b.data[0] +
        a.data[1] * b.data[4] +
        a.data[2] * b.data[8] +
        a.data[3] * b.data[12],

      a.data[0] * b.data[1] +
        a.data[1] * b.data[5] +
        a.data[2] * b.data[9] +
        a.data[3] * b.data[13],

      a.data[0] * b.data[2] +
        a.data[1] * b.data[6] +
        a.data[2] * b.data[10] +
        a.data[3] * b.data[14],

      a.data[0] * b.data[3] +
        a.data[1] * b.data[7] +
        a.data[2] * b.data[11] +
        a.data[3] * b.data[15],

      a.data[4] * b.data[0] +
        a.data[5] * b.data[4] +
        a.data[6] * b.data[8] +
        a.data[7] * b.data[12],
      a.data[4] * b.data[1] +
        a.data[5] * b.data[5] +
        a.data[6] * b.data[9] +
        a.data[7] * b.data[13],
      a.data[4] * b.data[2] +
        a.data[5] * b.data[6] +
        a.data[6] * b.data[10] +
        a.data[7] * b.data[14],
      a.data[4] * b.data[3] +
        a.data[5] * b.data[7] +
        a.data[6] * b.data[11] +
        a.data[7] * b.data[15],

      a.data[8] * b.data[0] +
        a.data[9] * b.data[4] +
        a.data[10] * b.data[8] +
        a.data[11] * b.data[12],
      a.data[8] * b.data[1] +
        a.data[9] * b.data[5] +
        a.data[10] * b.data[9] +
        a.data[11] * b.data[13],
      a.data[8] * b.data[2] +
        a.data[9] * b.data[6] +
        a.data[10] * b.data[10] +
        a.data[11] * b.data[14],
      a.data[8] * b.data[3] +
        a.data[9] * b.data[7] +
        a.data[10] * b.data[11] +
        a.data[11] * b.data[15],

      a.data[12] * b.data[0] +
        a.data[13] * b.data[4] +
        a.data[14] * b.data[8] +
        a.data[15] * b.data[12],
      a.data[12] * b.data[1] +
        a.data[13] * b.data[5] +
        a.data[14] * b.data[9] +
        a.data[15] * b.data[13],
      a.data[12] * b.data[2] +
        a.data[13] * b.data[6] +
        a.data[14] * b.data[10] +
        a.data[15] * b.data[14],
      a.data[12] * b.data[3] +
        a.data[13] * b.data[7] +
        a.data[14] * b.data[11] +
        a.data[15] * b.data[15],
    ]);
  }

  static mulVec(m: Matrix4x4, v: Vector4) {
    return new Vector4(
      m.data[0] * v.x + m.data[1] * v.y + m.data[2] * v.z + m.data[3] * v.w,
      m.data[4] * v.x + m.data[5] * v.y + m.data[6] * v.z + m.data[7] * v.w,
      m.data[8] * v.x + m.data[9] * v.y + m.data[10] * v.z + m.data[11] * v.w,
      m.data[12] * v.x + m.data[13] * v.y + m.data[14] * v.z + m.data[15] * v.w
    );
  }

  static rotateX(a: number) {
    const c = Math.cos(a);
    const s = Math.sin(a);

    return new Matrix4x4([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
  }

  static rotateY(a: number) {
    const c = Math.cos(a);
    const s = Math.sin(a);

    return new Matrix4x4([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
  }

  static rotateZ(a: number) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return new Matrix4x4([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  static scale(x: number, y: number, z: number) {
    return new Matrix4x4([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
  }

  static translate(x: number, y: number, z: number) {
    return new Matrix4x4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
  }

  static transpose(m: Matrix4x4) {
    return new Matrix4x4([
      m.data[0],
      m.data[4],
      m.data[8],
      m.data[12],
      m.data[1],
      m.data[5],
      m.data[9],
      m.data[13],
      m.data[2],
      m.data[6],
      m.data[10],
      m.data[14],
      m.data[3],
      m.data[7],
      m.data[11],
      m.data[15],
    ]);
  }

  static perspective(aspect: number, fov: number, near: number, far: number) {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
    const rangeInv = 1.0 / (near - far);

    return new Matrix4x4([
      f / aspect,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (near + far) * rangeInv,
      -1,
      0,
      0,
      2 * far * near * rangeInv,
      0,
    ]);
  }

  static mulMatrixList(matrixList: Matrix4x4[]) {
    const result_matrix = Matrix4x4.identity();
    for (let matrix of matrixList) {
      result_matrix.mul(matrix);
    }
    return result_matrix;
  }
}
