export class Vector3 {
  constructor(public x: number, public y: number, public z: number) {}
  add(x: number, y: number, z: number) {
    this.x += x;
    this.y += y;
    this.z += z;
    return this;
  }

  sub(x: number, y: number, z: number) {
    this.x -= x;
    this.y -= y;
    this.z -= z;
    return this;
  }

  div(x: number, y: number, z: number) {
    if (y === 0 || x === 0 || z === 0) {
      throw new Error("Cannot divide by zero");
    }

    this.x /= x;
    this.y /= y;
    this.z /= z;
    return this;
  }

  mul(x: number, y: number, z: number) {
    this.x *= x;
    this.y *= y;
    this.z *= z;
    return this;
  }

  addS(s: number) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  }
  subS(s: number) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
  }
  mulS(s: number) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }
  divS(s: number) {
    if (s === 0) {
      throw new Error("Cannot divide by zero");
    }
    this.x /= s;
    this.y /= s;
    this.z /= s;
    return this;
  }
  dot(v: Vector3) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  cross(v: Vector3) {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vector3(x, y, z);
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  nomalize() {
    const length = this.length();

    if (length === 0) {
      return new Vector3(0, 0, 0);
    }

    return new Vector3(this.x / length, this.y / length, this.z / length);
  }
}
