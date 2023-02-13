import { IGLElementBufferInfo } from "../../Buffer/types/IGLElementBufferInfo";
import { IGLVertexArrayAttribute } from "./IGLVertexArrayAttribute";

export type IGLVertexArrayInfo = {
  attributes: Record<string, IGLVertexArrayAttribute>;
  indices?: IGLElementBufferInfo;
};
