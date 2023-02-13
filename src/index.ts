import { AssetLoader } from "./Engine/core/assetLoader/AssetLoader";
import { Matrix4x4 } from "./Engine/core/math/Matrix4x4";
import { Vector3 } from "./Engine/core/math/Vector3";
import { Template, t } from "./Engine/core/Template";
import {
  WebGl,
  GLShader,
  GLProgram,
  GLVertexArray,
  GLUniform,
  GLTexture2D,
  GlRenderer,
} from "./Engine/core/WebGl";
import { BoxGeometry } from "./Engine/geometries/BoxGeometry";

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
  layout(location = 0) in vec4 position;
  layout(location = 1) in vec2 uv;
  layout(location = 2) in vec3 normal;


  out vec2 v_texcoord;
  out vec3 v_normal;
  out vec3 v_surfaceToLight;
  out vec3 v_surfaceToView;

  uniform mat4 u_projection;
  uniform mat4 u_model;
  uniform mat4 u_worldInverseTranspose;
  uniform vec3 u_lightWorldPosition;
  uniform vec3 u_viewWorldPosition;
  uniform mat4 u_world;
  uniform mat4 u_view;

  void main(){
    gl_Position = u_projection * u_view * u_world * u_model * position;


    v_normal = mat3(u_worldInverseTranspose) * mat3(u_model) * normal;

    vec3 surfaceWorldPosition = (u_world * u_model * position).xyz;

    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
    v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;

    v_texcoord = uv;
  }
`
);
const fragmentShader = new GLShader(
  "default",
  "fragment",
  `#version 300 es
  precision highp float;
  
  in vec2 v_texcoord;
  in vec3 v_normal;
  in vec3 v_surfaceToLight;
  in vec3 v_surfaceToView;


  out vec4 outColor;
  uniform sampler2D u_texture;
  uniform vec3 u_lightColor;
  uniform vec3 u_specularColor;
  uniform float u_shininess;
  
  void main(){

    vec3 normal = normalize(v_normal);

    vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
    vec3 surfaceToViewDirection = normalize(v_surfaceToView);
    vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);


    float light = dot(surfaceToLightDirection, normal);
    //float specular = dot(normal,halfVector);


    outColor = texture(u_texture, v_texcoord);


    float specular = 0.0;
    if (light > 0.0) {
      specular = pow(dot(normal, halfVector), u_shininess);
    }

    outColor.rgb *= light * u_lightColor;
    outColor.rgb += specular * u_specularColor;


  }
`
);
//outColor = texture(u_texture, v_texcoord);
WebGl.gl.canvas.width = innerWidth;
WebGl.gl.canvas.height = innerHeight;

const program = new GLProgram("default", vertexShader, fragmentShader);

AssetLoader.addAsset({
  name: "pokemon",
  url: "./assets/pokemon.png",
});
AssetLoader.addAsset({
  name: "digimon",
  url: "./assets/digimon.jpg",
});

let box = new BoxGeometry();
const vao = GLVertexArray.fromData({
  attributes: box.attributes,
  indices: box.indices,
});
console.log(box);

const perspecvtiveMatrix = Matrix4x4.perspective(
  WebGl.gl.canvas.width / WebGl.gl.canvas.height,
  Math.PI / 4,
  1,
  100
);
let angle = 0;
function loop() {
  const uniforms = {
    u_projection: new GLUniform(perspecvtiveMatrix, "mat"),
    u_model: new GLUniform(
      Matrix4x4.scale(10, 10, 10).rotateY((Math.PI / 180) * angle),
      "mat"
    ),
    u_view: new GLUniform(Matrix4x4.translate(0, -10.0, -100.0), "mat"),
    u_worldInverseTranspose: new GLUniform(Matrix4x4.identity(), "mat"),
    u_lightWorldPosition: new GLUniform(new Vector3(0.0, 0.0, 8.0), "float"),
    u_world: new GLUniform(Matrix4x4.identity(), "mat"),
    u_viewWorldPosition: new GLUniform(new Vector3(0.0, 10.0, 100.0), "float"),
    u_shininess: new GLUniform(100.0, "float:1"),
    u_lightColor: new GLUniform(new Vector3(1.0, 1.0, 1.0), "float"),
    u_specularColor: new GLUniform(new Vector3(1.0, 1.0, 1.0), "float"),
  };
  const texture = new GLTexture2D();
  texture.onLoadImage(AssetLoader.getLoadedAsset("image:digimon").data);
  const renderer = new GlRenderer(program, vao, uniforms, [texture]);

  renderer.render();
  angle += 1;
  requestAnimationFrame(loop);
}

AssetLoader.loadAssets().then(() => {
  loop();
});
