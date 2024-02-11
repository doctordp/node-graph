import { D3Controller } from "./d3.controller";
import { GraphRenderer } from "./graph-renderer.model";
import { GraphState } from "./graph-state.model";

export class DomiGraph {
  private canvasContainer: HTMLElement | null;
  private canvasElement: HTMLCanvasElement;

  private d3Controller: D3Controller;
  private state: GraphState;
  private renderer: GraphRenderer;

  constructor(container: HTMLElement | string) {
    this.canvasContainer =
      typeof container === "string"
        ? document.getElementById(container)
        : container;
    const canvas = document.createElement("canvas");
    canvas.height = this.canvasContainer?.offsetHeight ?? 0;
    canvas.width = this.canvasContainer?.offsetWidth ?? 0;

    this.canvasElement = canvas;
    this.canvasContainer?.appendChild(this.canvasElement);
    this.state = new GraphState(this.canvasElement);
    this.renderer = new GraphRenderer(this.state, this.canvasElement);

    this.d3Controller = new D3Controller(
      this.canvasElement,
      this.state,
      this.renderer
    );
  }

  public enableResize(): this {
    window.addEventListener("resize", () => {
      this.canvasElement.height = this.canvasContainer?.offsetHeight ?? 0;
      this.canvasElement.width = this.canvasContainer?.offsetWidth ?? 0;
    });

    return this;
  }

  public disableResize(): this {
    window.removeEventListener("resize", () => {});

    return this;
  }
}
