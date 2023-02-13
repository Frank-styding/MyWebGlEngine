import { IDataType } from "../../IDataType";

export type IGLBufferInfo = {
  data: number[];
  type: IDataType;
  size: number;
  options?: {
    usage: number;
  };
};
