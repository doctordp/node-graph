import { LinkObject } from "./interfaces/link.interface";
import { NodeObject } from "./interfaces/node.interface";

export class GraphState {
  public nodes: NodeObject[] = [];
  public links: LinkObject[] = [];

  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.initRandomGraph();
  }

  private initRandomGraph() {
    const width = this.canvas.width;
    const height = this.canvas.height;

    const nodes: NodeObject[] = [
      { id: "0", x: width / 4, y: height / 4 },
      ...Array(10000)
        .fill(0)
        .map((v, i) => ({
          id: `${i + 1}`,
        })),
    ];

    for (let i = 1; i < nodes.length; i++) {
      nodes[i].x =
        nodes[Math.floor(Math.random() * i)].x +
        Math.pow(Math.floor(Math.random() * -25), 2);
      nodes[i].y =
        nodes[Math.floor(Math.random() * i)].y +
        Math.pow(Math.floor(Math.random() * -25), 2);
    }

    const links: LinkObject[] = nodes.map((n) => ({
      source: n,
      target: nodes[Math.floor(Math.random() * (nodes.length - 1))],
      /*   target: graph.nodes[0], */
    }));

    this.nodes = nodes as NodeObject[];
    this.links = links;
  }
}
