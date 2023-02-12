import { Vector2 } from "./Vector2";

type IMatrix2x2Data = [number, number, number, number];

export class Matrix2x2 {
  constructor(public data: IMatrix2x2Data) {}

  det() {
    return this.data[2] * this.data[1] - this.data[0] * this.data[3];
  }

  mulVec(v: Vector2) {
    return new Vector2(
      this.data[0] * v.x + this.data[2] * v.y,
      this.data[1] * v.x + this.data[3] * v.y
    );
  }

  mul(m: Matrix2x2) {
    this.data = Matrix2x2.mul(this, m).data;
    return this;
  }

  mulPre(m: Matrix2x2) {
    this.data = Matrix2x2.mul(m, this).data;
    return this;
  }

  transpose() {
    this.data = Matrix2x2.transpose(this).data;
    return this;
  }

  clone() {
    return new Matrix2x2(this.data);
  }

  copy(m: Matrix2x2) {
    this.data = m.data;
    return this;
  }

  rotate(a: number) {
    this.data = Matrix2x2.mul(this, Matrix2x2.rotate(a)).data;
    return this;
  }

  scale(x: number, y: number) {
    this.data = Matrix2x2.mul(this, Matrix2x2.scale(x, y)).data;
    return this;
  }

  inv() {
    return Matrix2x2.inv(this);
  }

  static identity() {
    return new Matrix2x2([1, 0, 0, 1]);
  }

  static mul(a: Matrix2x2, b: Matrix2x2) {
    return new Matrix2x2([
      a.data[0] * b.data[0] + a.data[1] * b.data[2],
      a.data[0] * b.data[1] + a.data[1] * b.data[3],
      a.data[2] * b.data[0] + a.data[3] * b.data[2],
      a.data[2] * b.data[1] + a.data[3] * b.data[3],
    ]);
  }

  static rotate(a: number) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return new Matrix2x2([c, -s, s, c]);
  }

  static scale(x: number, y: number) {
    return new Matrix2x2([x, 0, 0, y]);
  }

  static transpose(m: Matrix2x2) {
    return new Matrix2x2([m.data[0], m.data[2], m.data[1], m.data[3]]);
  }

  static inv(m: Matrix2x2) {
    const det = m.det();

    return new Matrix2x2([
      m.data[3] / det,
      -m.data[1] / det,
      -m.data[2] / det,
      m.data[0] / det,
    ]);
  }

  static mulMatrixList(matrixList: Matrix2x2[]) {
    const result_matrix = Matrix2x2.identity();
    for (let matrix of matrixList) {
      result_matrix.mul(matrix);
    }
    return result_matrix;
  }
}
