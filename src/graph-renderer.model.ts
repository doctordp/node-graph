import { ZoomTransform } from "d3";
import { GraphState } from "./graph-state.model";

export class GraphRenderer {
  private graphState: GraphState;

  private canvas: HTMLCanvasElement;

  constructor(graphState: GraphState, canvas: HTMLCanvasElement) {
    this.graphState = graphState;
    this.canvas = canvas;
  }

  public draw(transform: ZoomTransform) {
    const context: CanvasRenderingContext2D = this.canvas.getContext("2d");
    const height: number = this.canvas.offsetHeight;
    const width: number = this.canvas.offsetWidth;

    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(transform.x, transform.y);
    context.scale(transform.k, transform.k);

    // Draw links
    context.beginPath();
    this.graphState.links.forEach(function (d) {
      context.moveTo(d.source.x, d.source.y);
      context.lineTo(d.target.x, d.target.y);
    });
    context.strokeStyle = "#aaa";
    context.stroke();

    // Draw nodes

    const winnerId: string = `${Math.floor(
      Math.random() * this.graphState.nodes.length
    )}`;

    for (const node of this.graphState.nodes) {
      if (parseInt(node.id) % 32 === 0) {
        /*      if (hoverCoords.x && hoverCoords.y) {
          if (
            hoverCoords.x < node.x + 6 &&
            hoverCoords.x > node.x - 6 &&
            hoverCoords.y < node.y + 6 &&
            hoverCoords.y > node.y - 6
          ) {
            context.beginPath();
            context.fillStyle = "blue";
            context.arc(node.x, node.y, 8, 0, 2 * Math.PI, true);
            context.fill();
            context.closePath();
          }
        } */

        if (!node.image) {
          node.image = document.createElement("img");
          node.image.src = "../assets/face.jpeg";
        }

        context.beginPath();
        const size = 10;
        context.drawImage(
          node.image,
          node.x - size / 2,
          node.y - size / 2,
          size,
          size
        );

        context.closePath();

        continue;
      }

      context.fillStyle =
        parseInt(winnerId) === parseInt(node.id)
          ? "red"
          : parseInt(node.id) % 2 === 0
          ? "green"
          : "#333";
      if (parseInt(node.id) % 75 === 0) {
        context.beginPath();
        context.fillStyle = "red";
        context.arc(node.x, node.y, 6, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
      }
      /* 
      if (node.id == 1) {
        console.log(
          hoverCoords,
          node.x,
          node.y,
          hoverCoords.x < node.x + 6,
          hoverCoords.x > node.x - 6,
          hoverCoords.y < node.y + 6,
          hoverCoords.y > node.y - 6
        );
      } */
      /*       if (hoverCoords.x && hoverCoords.y) {
        if (
          hoverCoords.x < node.x + 6 &&
          hoverCoords.x > node.x - 6 &&
          hoverCoords.y < node.y + 6 &&
          hoverCoords.y > node.y - 6
        ) {
          console.log("llego al path");
          context.beginPath();
          context.fillStyle = "blue";
          context.arc(node.x, node.y, 8, 0, 2 * Math.PI, true);
          context.fill();
          context.closePath();
        }
      } */

      context.beginPath();
      context.fillStyle =
        parseInt(winnerId) === parseInt(node.id)
          ? "red"
          : parseInt(node.id) % 2 === 0
          ? "green"
          : "#333";

      context.arc(node.x, node.y, 4, 0, 2 * Math.PI, true);
      context.fill();
    }

    context.restore();
  }
}
