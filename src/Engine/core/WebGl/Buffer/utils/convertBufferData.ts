import { IDataType } from "../../IDataType";

export function convertBufferData(data: number[], type: IDataType) {
  switch (type) {
    case "float":
      return new Float32Array(data);
    case "float64":
      return new Float64Array(data);
    case "int8":
      return new Int8Array(data);
    case "int16":
      return new Int16Array(data);
    case "int32":
      return new Int32Array(data);
    case "uint8":
      return new Uint8Array(data);
    case "uint16":
      return new Uint16Array(data);
    case "uint32":
      return new Uint32Array(data);
  }
}
