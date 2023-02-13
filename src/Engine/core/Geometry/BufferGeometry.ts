import { IGLElementBufferInfo, IGLVertexArrayAttribute } from "../WebGl";

export class BufferGeometry {
  attributes: Record<string, IGLVertexArrayAttribute> = {};
  indices?: IGLElementBufferInfo;
  group: { start: number; count: number; materialIndex: number }[] = [];

  setAttribute(name: string, atribute: IGLVertexArrayAttribute) {
    this.attributes[name] = atribute;
  }

  setIdx(indexs: IGLElementBufferInfo) {
    this.indices = indexs;
  }

  addGroup(start: number, count: number, materialIndex: number) {
    this.group.push({ start, count, materialIndex });
  }

  clearGroups() {
    this.group = [];
  }
}
