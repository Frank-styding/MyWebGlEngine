import { BufferGeometry } from "../core/Geometry/BufferGeometry";
import { Vector3 } from "../core/math/Vector3";

export class BoxGeometry extends BufferGeometry {
  constructor(
    width = 1,
    height = 1,
    depth = 1,
    widthSegments = 1,
    heightSegments = 1,
    depthSegments = 1
  ) {
    super();

    const vertices: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    let groupCount = 0;
    let groupStart = 0;
    let numberOfVertices = 0;
    const scope = this;

    buildPlane(
      "z",
      "y",
      "x",
      -1,
      -1,
      depth,
      height,
      width,
      depthSegments,
      heightSegments,
      0
    );

    buildPlane(
      "z",
      "y",
      "x",
      1,
      -1,
      depth,
      height,
      -width,
      depthSegments,
      heightSegments,
      1
    );

    buildPlane(
      "x",
      "z",
      "y",
      1,
      1,
      width,
      depth,
      height,
      widthSegments,
      depthSegments,
      2
    );
    buildPlane(
      "x",
      "z",
      "y",
      1,
      -1,
      width,
      depth,
      -height,
      widthSegments,
      depthSegments,
      3
    );
    buildPlane(
      "x",
      "y",
      "z",
      1,
      -1,
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      4
    );
    buildPlane(
      "x",
      "y",
      "z",
      -1,
      -1,
      width,
      height,
      -depth,
      widthSegments,
      heightSegments,
      5
    );

    this.setIdx({ data: indices });
    this.setAttribute("position", {
      buffer: {
        data: vertices,
        type: "float",
        size: 3,
      },
    });
    this.setAttribute("normal", {
      buffer: {
        data: normals,
        type: "float",
        size: 3,
      },
    });
    this.setAttribute("uv", {
      buffer: {
        data: uvs,
        type: "float",
        size: 2,
      },
    });

    function buildPlane(
      u: "x" | "y" | "z",
      v: "x" | "y" | "z",
      w: "x" | "y" | "z",
      udir: number,
      vdir: number,
      width: number,
      height: number,
      depth: number,
      gridX: number,
      gridY: number,
      materialIndex: number
    ) {
      const vector = new Vector3(0, 0, 0);
      const segmentWidth = width / gridX;
      const segmentHeight = height / gridY;
      let vertexCounter = 0;

      for (let i = 0; i <= gridX; i++) {
        const y = i * segmentHeight - height / 2;
        for (let j = 0; j <= gridY; j++) {
          const x = j * segmentWidth - width / 2;

          vector[u] = x * udir;
          vector[v] = y * vdir;
          vector[w] = depth / 2;

          vertices.push(vector.x, vector.y, vector.z);

          vector[u] = 0;
          vector[v] = 0;
          vector[w] = depth > 0 ? 1 : -1;

          normals.push(vector.x, vector.y, vector.z);

          uvs.push(i / gridX, 1 - j / gridY);
          vertexCounter += 1;
        }
      }

      for (let i = 0; i < gridY; i++) {
        for (let j = 0; j < gridX; j++) {
          const a = numberOfVertices + i + (gridX + 1) * i;
          const b = numberOfVertices + i + (gridX + 1) * (i + 1);
          const c = numberOfVertices + (i + 1) + (gridX + 1) * (i + 1);
          const d = numberOfVertices + (i + 1) + (gridX + 1) * i;

          indices.push(a, b, d);
          indices.push(b, c, d);

          // increase counter

          groupCount += 6;
        }
      }

      scope.addGroup(groupStart, groupCount, materialIndex);
      groupStart += groupCount;

      numberOfVertices += vertexCounter;
    }
  }
}
