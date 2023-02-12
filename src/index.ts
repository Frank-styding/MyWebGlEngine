import { AssetLoader } from "./core/assetLoader/AssetLoader";
import { Matrix4x4 } from "./core/Renderer/math/Matrix4x4";
import {
  WebGl,
  GLShader,
  GLProgram,
  GLBuffer,
  GLElementBuffer,
  GLVertexArray,
  GlRenderer,
} from "./core/Renderer/WebGl";
import { GlTexture2D } from "./core/Renderer/WebGl/GlTexture";
import { GLUniform } from "./core/Renderer/WebGl/GLUniform";
import { Template, t } from "./core/Template";
import { vaoJson } from "./CubeGeometry";

let canvasTemplate: Template;
t("id:root", {
  styles: {
    padding: 0,
    margin: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
  },
  childs: [
    {
      tag: "canvas",
      ref: (e) => {
        canvasTemplate = e;
      },
    },
  ],
});

WebGl.init(canvasTemplate.element as HTMLCanvasElement);

const vertexShader = new GLShader(
  "default",
  "vertex",
  `#version 300 es
  in vec4 a_position;
  in vec2 a_texcoord;
  out vec2 v_texcoord;

  uniform mat4 u_projection;
  uniform mat4 u_model;

  void main(){
    gl_Position = u_projection * u_model * a_position;
    v_texcoord = a_texcoord;
  }
`
);
const fragmentShader = new GLShader(
  "default",
  "fragment",
  `#version 300 es
  precision highp float;
  in vec2 v_texcoord;
  out vec4 outColor;
  uniform sampler2D u_texture;
  void main(){
    outColor = texture(u_texture, v_texcoord);
  }
`
);

WebGl.gl.canvas.width = innerWidth;
WebGl.gl.canvas.height = innerHeight;

const program = new GLProgram("default", vertexShader, fragmentShader);

const vao = GLVertexArray.fromJson(vaoJson);

AssetLoader.addAsset({
  name: "pokemon",
  url: "./assets/pokemon.png",
});
AssetLoader.addAsset({
  name: "digimon",
  url: "./assets/digimon.jpg",
});

AssetLoader.loadAssets().then(() => {
  const renderer = new GlRenderer(
    program,
    vao,
    {
      u_projection: new GLUniform(
        Matrix4x4.perspective(
          WebGl.gl.canvas.width / WebGl.gl.canvas.height,
          Math.PI / 4,
          1,
          100
        ),
        "matrix"
      ),
      u_model: new GLUniform(
        Matrix4x4.rotateX(Math.PI / 2).translate(0, 0, -5.0),
        "matrix"
      ),
    },
    [GlTexture2D.fromAssets("image:digimon")]
  );
  renderer.render();
});
