import { DomiGraph } from "./graph.model";

export default function initGraph(containerID: string): DomiGraph {
  const element = document.getElementById(containerID);
  console.log(element);

  return new DomiGraph(element ?? containerID);
}
