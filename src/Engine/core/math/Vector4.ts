export class Vector4 {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public w: number
  ) {}

  add(x: number, y: number, z: number, w: number) {
    this.x += x;
    this.y += y;
    this.z += z;
    this.w += w;
    return this;
  }

  mul(x: number, y: number, z: number, w: number) {
    this.x *= x;
    this.y *= y;
    this.z *= z;
    this.w *= w;
    return this;
  }

  sub(x: number, y: number, z: number, w: number) {
    this.x -= x;
    this.y -= y;
    this.z -= z;
    this.w -= w;
    return this;
  }

  div(x: number, y: number, z: number, w: number) {
    if (this.x == 0 || this.y == 0 || this.z == 0 || this.w == 0) {
    }
    this.x /= x;
    this.y /= y;
    this.z /= z;
    this.w /= w;
    return this;
  }

  addS(s: number) {
    this.x += s;
    this.y += s;
    this.z += s;
    this.w += s;
    return this;
  }

  subS(s: number) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    this.w -= s;
    return this;
  }

  divS(s: number) {
    if (s == 0) {
      throw new Error("Division by zero");
    }
    this.x /= s;
    this.y /= s;
    this.z /= s;
    this.w /= s;
    return this;
  }

  mulS(s: number) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    this.w *= s;
    return this;
  }

  length() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }

  dot(v: Vector4) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }

  normalize() {
    let l = this.length();
    if (l == 0) {
      throw new Error("Length of vector is zero");
    }
    return new Vector4(this.x / l, this.y / l, this.z / l, this.w / l);
  }
}
