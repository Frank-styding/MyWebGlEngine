import { IDataType } from "../../IDataType";
import { WebGl } from "../../WebGl";

export function convertToWebGlType(type: IDataType) {
  const gl = WebGl.gl;
  switch (type) {
    case "float":
    case "float64":
      return gl.FLOAT;

    case "int8":
    case "int16":
    case "int32":
      return gl.INT;

    case "uint8":
    case "uint16":
    case "uint32":
      return gl.UNSIGNED_INT;
  }
}
