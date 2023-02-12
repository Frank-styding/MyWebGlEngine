import { IAsset } from "./IAsset";
import { Loader } from "./Loader";

class ImageLoader extends Loader {
  validExt: string[] = ["png", "jpg", "jpeg", "gif"];
  fileType = "image";

  async loadAssset(asset: IAsset) {
    const url = asset.url;
    const image = new Image();
    image.src = url;
    await new Promise((res) => {
      image.onload = () => {
        AssetLoader.addLoadedAsset(this, { ...asset, data: image });
        res(image);
      };
    });
  }
}

export class AssetLoader {
  static loadedAssets: Record<string, IAsset> = {};
  static assets: Record<string, IAsset> = {};
  static loaders: Loader[] = [new ImageLoader()];

  static addAsset(asset: IAsset) {
    const loader = AssetLoader.getLoaderByUrl(asset.url);
    this.assets[loader.fileType + ":" + asset.name] = asset;
  }

  static getLoaderByUrl(url: string) {
    return AssetLoader.loaders.filter(
      (loader) => loader.validExt.indexOf(url.split(".").pop()) > -1
    )[0];
  }

  static registerLoader(loader: Loader) {
    AssetLoader.loaders.push(loader);
  }

  static addLoadedAsset(loader: Loader, asset: IAsset) {
    this.loadedAssets[loader.fileType + ":" + asset.name] = asset;
  }

  static async loadAssets() {
    const promises = Object.keys(AssetLoader.assets).map((key) => {
      if (AssetLoader.loadedAssets[key] !== undefined) return;
      const asset = AssetLoader.assets[key];

      const loader = AssetLoader.getLoaderByUrl(asset.url);

      return loader.loadAssset(asset);
    });

    await Promise.all(promises);
  }

  static getLoadedAsset(name: string) {
    return AssetLoader.loadedAssets[name];
  }
}
