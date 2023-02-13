import { IAsset } from "./IAsset";

export abstract class Loader {
  validExt: string[] = [];
  fileType: string = "";
  async loadAssset(asset: IAsset) {}
}
