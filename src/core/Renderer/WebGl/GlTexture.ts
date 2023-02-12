import { AssetLoader } from "../../assetLoader/AssetLoader";
import { WebGl } from "./WebGl";

export class GlTexture2D {
  texture: WebGLTexture;
  constructor() {
    const gl = WebGl.gl;

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255])
    );
    gl.bindTexture(gl.TEXTURE_2D, null);
    this.texture = texture;
  }

  onLoadImage(image: HTMLImageElement) {
    const gl = WebGl.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    function isPowerOf2(value: number) {
      return (value & (value - 1)) == 0;
    }

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      // Yes, it's a power of 2. Generate mips.
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // No, it's not a power of 2. Turn off mips and set wrapping to clamp to edge
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  bind(idx: number) {
    const gl = WebGl.gl;
    gl.activeTexture(gl.TEXTURE0 + idx);
    WebGl.gl.bindTexture(gl.TEXTURE_2D, this.texture);
  }

  unBind(idx: number) {
    const gl = WebGl.gl;
    gl.activeTexture(gl.TEXTURE0 + idx);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  destroy() {
    const gl = WebGl.gl;
    gl.deleteTexture(this.texture);
  }

  static fromAssets(assetName: string) {
    const texture = new GlTexture2D();
    texture.onLoadImage(AssetLoader.getLoadedAsset(assetName).data);
    return texture;
  }
}
