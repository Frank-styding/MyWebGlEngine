import { GLBuffer } from "../../Buffer/GLBuffer";

export type IBuffers = Record<
  string,
  {
    buffer: GLBuffer;
    options?: {
      offset: number;
      stride: number;
      normalized: boolean;
    };
  }
>;
