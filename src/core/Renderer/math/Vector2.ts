export class Vector2 {
  constructor(public x: number, public y: number) {}

  add(x: number, y: number) {
    this.x += x;
    this.y += y;
    return this;
  }

  sub(x: number, y: number) {
    this.x -= x;
    this.y -= y;
    return this;
  }

  mul(x: number, y: number) {
    this.x *= x;
    this.y *= y;
    return this;
  }

  div(x: number, y: number) {
    if (y === 0 || x == 0) {
      throw new Error("Cannot divide by zero");
    }
    this.x /= x;
    this.y /= y;
    return this;
  }

  mulS(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  divS(s: number) {
    if (s === 0) {
      throw new Error("Cannot divide by zero");
    }
    this.x /= s;
    this.y /= s;
    return this;
  }

  addS(s: number) {
    this.x += s;
    this.y += s;
    return this;
  }

  subS(s: number) {
    this.x -= s;
    this.y -= s;
    return this;
  }

  dot(v: Vector2) {
    return this.x * v.x + this.y * v.y;
  }

  cross(v: Vector2) {
    return this.x * v.y - this.y * v.x;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const length = this.length();

    if (length === 0) {
      throw new Error("Cannot normalize zero vector");
    }

    return new Vector2(this.x / length, this.y / length);
  }
  clone() {
    return new Vector2(this.x, this.y);
  }
  copy(v: Vector2) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
}
