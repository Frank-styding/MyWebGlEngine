import { Vector3 } from "./Vector3";

type IMatrix3x3Data = [
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

export class Matrix3x3 {
  constructor(public data: IMatrix3x3Data) {
    this.data ??= Matrix3x3.identity().data;
  }

  mul(m: Matrix3x3) {
    this.data = Matrix3x3.mul(this, m).data;
    return this;
  }

  mulVec(v: Vector3) {
    return Matrix3x3.mulVec(this, v);
  }

  rotateX(a: number) {
    this.data = Matrix3x3.mul(this, Matrix3x3.rotateX(a)).data;
    return this;
  }

  rotateY(a: number) {
    this.data = Matrix3x3.mul(this, Matrix3x3.rotateY(a)).data;
    return this;
  }

  rotateZ(a: number) {
    this.data = Matrix3x3.mul(this, Matrix3x3.rotateZ(a)).data;
    return this;
  }

  scale(x: number, y: number) {
    this.data = Matrix3x3.mul(this, Matrix3x3.scale(x, y)).data;
    return this;
  }

  translate(x: number, y: number) {
    this.data = Matrix3x3.mul(this, Matrix3x3.translate(x, y)).data;
    return this;
  }

  transpose() {
    this.data = Matrix3x3.transpose(this).data;
    return this;
  }

  inv() {
    return Matrix3x3.inv(this);
  }

  det() {
    return Matrix3x3.det(this);
  }

  copy(m: Matrix3x3) {
    this.data = m.data;
    return this;
  }

  clone() {
    return new Matrix3x3(this.data);
  }

  static identity() {
    return new Matrix3x3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  }

  static mul(a: Matrix3x3, b: Matrix3x3) {
    return new Matrix3x3([
      a.data[0] * b.data[0] + a.data[1] * b.data[3] + a.data[2] * b.data[6],
      a.data[0] * b.data[1] + a.data[1] * b.data[4] + a.data[2] * b.data[7],
      a.data[0] * b.data[2] + a.data[1] * b.data[5] + a.data[2] * b.data[8],

      a.data[3] * b.data[0] + a.data[4] * b.data[3] + a.data[5] * b.data[6],
      a.data[3] * b.data[1] + a.data[4] * b.data[4] + a.data[5] * b.data[7],
      a.data[3] * b.data[2] + a.data[4] * b.data[5] + a.data[5] * b.data[8],

      a.data[6] * b.data[0] + a.data[7] * b.data[3] + a.data[8] * b.data[6],
      a.data[6] * b.data[1] + a.data[7] * b.data[4] + a.data[8] * b.data[7],
      a.data[6] * b.data[2] + a.data[7] * b.data[5] + a.data[8] * b.data[8],
    ]);
  }

  static mulVec(m: Matrix3x3, v: Vector3) {
    return new Vector3(
      m.data[0] * v.x + m.data[1] * v.y + m.data[2] * v.z,
      m.data[3] * v.x + m.data[4] * v.y + m.data[5] * v.z,
      m.data[6] * v.x + m.data[7] * v.y + m.data[8] * v.z
    );
  }

  static rotateX(a: number) {
    const c = Math.cos(a);
    const s = Math.sin(a);

    return new Matrix3x3([1, 0, 0, 0, c, -s, 0, s, c]);
  }

  static rotateY(a: number) {
    const c = Math.cos(a);
    const s = Math.sin(a);

    return new Matrix3x3([c, 0, s, 0, 1, 0, -s, 0, c]);
  }

  static rotateZ(a: number) {
    const c = Math.cos(a);
    const s = Math.sin(a);

    return new Matrix3x3([c, -s, 0, s, c, 0, 0, 0, 1]);
  }

  static scale(x: number, y: number) {
    return new Matrix3x3([x, 0, 0, 0, y, 0, 0, 0, 1]);
  }

  static translate(x: number, y: number) {
    return new Matrix3x3([1, 0, x, 0, 1, y, 0, 0, 1]);
  }

  static transpose(m: Matrix3x3) {
    return new Matrix3x3([
      m.data[0],
      m.data[3],
      m.data[6],
      m.data[1],
      m.data[4],
      m.data[7],
      m.data[2],
      m.data[5],
      m.data[8],
    ]);
  }

  static det(m: Matrix3x3) {
    return (
      m.data[0] * (m.data[5] * m.data[7] - m.data[4] * m.data[8]) +
      -m.data[1] * (m.data[3] * m.data[8] - m.data[5] * m.data[6]) +
      m.data[2] * (m.data[6] * m.data[4] - m.data[3] * m.data[7])
    );
  }

  static inv(m: Matrix3x3) {
    const det = Matrix3x3.det(m);

    return Matrix3x3.transpose(
      new Matrix3x3([
        (m.data[7] * m.data[5] - m.data[4] * m.data[8]) / det,
        -(m.data[6] * m.data[5] - m.data[3] * m.data[8]) / det,
        (m.data[6] * m.data[4] - m.data[3] * m.data[7]) / det,

        -(m.data[7] * m.data[2] - m.data[1] * m.data[8]) / det,
        (m.data[6] * m.data[2] - m.data[0] * m.data[8]) / det,
        -(m.data[6] * m.data[1] - m.data[0] * m.data[7]) / det,

        (m.data[3] * m.data[1] - m.data[0] * m.data[4]) / det,
        -(m.data[3] * m.data[2] - m.data[0] * m.data[5]) / det,
        (m.data[3] * m.data[1] - m.data[0] * m.data[4]) / det,
      ])
    );
  }

  static mulMatrixList(matrixList: Matrix3x3[]) {
    const result_matrix = Matrix3x3.identity();
    for (let matrix of matrixList) {
      result_matrix.mul(matrix);
    }
    return result_matrix;
  }
}
