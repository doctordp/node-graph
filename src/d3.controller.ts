import {
  DragBehavior,
  ZoomBehavior,
  ZoomTransform,
  drag,
  select,
  zoom,
  zoomIdentity,
} from "d3";
import { GraphState } from "./graph-state.model";
import { NodeObject } from "./interfaces/node.interface";
import { GraphRenderer } from "./graph-renderer.model";
//import * as d3 from "d3";

export class D3Controller {
  public transform: ZoomTransform;
  private zoom: ZoomBehavior<any, any>;
  private drag: DragBehavior<any, any, any>;

  private draggingNode: NodeObject;

  private canvas: HTMLCanvasElement;
  private graphState: GraphState;
  private renderer: GraphRenderer;

  constructor(
    canvas: HTMLCanvasElement,
    graphState: GraphState,
    renderer: GraphRenderer
  ) {
    this.canvas = canvas;
    this.graphState = graphState;
    this.renderer = renderer;
    this.transform = zoomIdentity;
    console.log(this.transform);
    // init zoom

    this.zoom = zoom()
      .scaleExtent([0.5, 10])
      .on("zoom", (event) => {
        this.transform = event.transform;
        this.draw();
      });

    // init drag

    this.drag = drag()
      .container(this.canvas)
      .subject(this.dragSubject.bind(this))
      .on("start", this.dragStarted.bind(this))
      .on("drag", this.dragged.bind(this))
      .on("end", this.dragEnded.bind(this));

    select(this.canvas).call(this.drag).call(this.zoom);

    this.draw();
  }

  public draw() {
    this.renderer.draw(this.transform);
  }

  private dragSubject(event: any) {
    let x = this.transform.invertX(event.x),
      y = this.transform.invertY(event.y);

    for (const node of this.graphState.nodes) {
      let dx = x - node.x,
        dy = y - node.y;

      if (dx * dx + dy * dy < 25) {
        // 25 is the radius squared
        this.draggingNode = { ...node };
        return node;
      }
    }
  }

  private dragStarted(event: any) {
    if (!event.active && !this.draggingNode) {
      this.zoom.transform(this.canvas as any, this.transform);
    }
  }

  private dragged(event: any) {
    if (this.draggingNode) {
      for (const node of this.graphState.nodes) {
        if (node.id !== this.draggingNode.id) continue;

        node.x =
          this.draggingNode.x -
          (this.draggingNode.x - event.x) / this.transform.k;
        node.y =
          this.draggingNode.y -
          (this.draggingNode.y - event.y) / this.transform.k;
      }
    }
  }

  private dragEnded(event: any) {
    if (!event.active && !this.draggingNode) {
      this.zoom.transform(this.canvas as any, this.transform);
    }
    if (this.draggingNode) {
      this.draggingNode = null;
    }
  }
}
