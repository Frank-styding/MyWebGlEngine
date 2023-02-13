import { IGLBufferInfo } from "../../Buffer/types/IGLBufferInfo";

export type IGLVertexArrayAttribute = {
  buffer: IGLBufferInfo;
  options?: {
    offset: number;
    stride: number;
    normalized: boolean;
  };
};
