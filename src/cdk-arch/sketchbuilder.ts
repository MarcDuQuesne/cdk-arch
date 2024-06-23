import * as fs from 'fs';
import * as primitives from './primitives';

export interface AppState {
  readonly viewBackgroundColor: string;
  readonly gridSize: number;
}

export interface Data {
  readonly type: string;
  readonly version: number;
  readonly source: string;
  readonly elements: any[];
  readonly appState: AppState;
}

export class SketchBuilder {

  data: Data;
  drawObjs: any[];
  groups: any[];

  constructor() {
    this.data = {
      type: 'excalidraw',
      version: 1,
      source: 'procXD',
      elements: [],
      appState: {
        viewBackgroundColor: '#ffffff',
        gridSize: 1,
      },
    };
    this.drawObjs = [];
    this.groups = [];
  }

  addElement(element: primitives.ExcaliDrawPrimitive): string {
    this.drawObjs.push(element);
    return element.id;
  }

  exportToFile(savePath: string): void {
    for (const element of this.drawObjs) {
      this.data.elements.push(element.props);
    }

    if (!savePath.endsWith('.excalidraw')) {
      savePath += '.excalidraw';
    }

    fs.writeFileSync(savePath, JSON.stringify(this.data, null, 4));
  }

  // createBoundingElement(element: any, elementType = 'Rectangle', backgroundColor = '#e64980', padding = 10, returnGroup = true, disolvePriorGroup = true): any {
  //     const group: primitives.Group = new primitives.Group();
  //     const elementBBox = element.bbox;
  //     const newX = elementBBox[0] - padding;
  //     const newY = elementBBox[1] - padding;
  //     const newWidth = elementBBox[2] - elementBBox[0] + 2 * padding;
  //     const newHeight = elementBBox[3] - elementBBox[1] + 2 * padding;
  //     const ElementClass = (primitives as any)[elementType];
  //     const boundingElement = new ElementClass({
  //         setToSolid: true,
  //         x: newX,
  //         y: newY,
  //         width: newWidth,
  //         height: newHeight,
  //         backgroundColor,
  //     });


  //     if (returnGroup) {
  //         const elements = element instanceof primitives.Group ? element.elements : [element];
  //         elements.unshift(boundingElement);
  //         const group: primitives.Group = new primitives.Group();
  //         for (const elem of elements) {
  //             group.addElement(elem);
  //         }

  //         group.x += padding;
  //         group.y += padding;
  //         if (disolvePriorGroup) {
  //             for (const elem of elements) {
  //                 if (elem instanceof primitives.Group) {
  //                     elem.emptyAllSubelements();
  //                 }
  //             }
  //         }
  //         return group;
  //     } else {
  //         return boundingElement;
  //     }
  // }

  // createTextBlock(content: string[], padding = 10, setToCode = true, returnGroup = true): any {

  //     // const elements = content.map(line => new primitives.Text({ setToCode, text: line }));
  //     const elements: any[] = [];
  //     this.orderSequence(elements, 'orderBelow', padding);

  //     const group = new primitives.Group();
  //     for (const element of elements) {
  //         group.addElement(element);
  //     }

  //     if (returnGroup) {
  //         return group;
  //     }
  //     return elements;
  // }

  // orderSequence(elementList: any[], orderType: string, padding = 10): void {
  //     const orderFunc = (this as any)[orderType].bind(this);
  //     for (let i = 0; i < elementList.length - 1; i++) {
  //         orderFunc(elementList[i], elementList[i + 1], padding);
  //     }
  // }

  // orderBelow(element1: any, element2: any, padding = 10): void {
  //     const element1BBox = element1.bbox;
  //     element2.y = element1BBox[3] + padding;
  // }

  // orderAbove(element1: any, element2: any, padding = 10): void {
  //     const element1BBox = element1.bbox;
  //     element2.y = element1BBox[1] - element2.height - padding;
  // }

  // orderLeft(element1: any, element2: any, padding = 10): void {
  //     const element1BBox = element1.bbox;
  //     element2.x = element1BBox[0] - element2.width - padding;
  // }

  // orderRight(element1: any, element2: any, padding = 10): void {
  //     const element1BBox = element1.bbox;
  //     element2.x = element1BBox[2] + padding;
  // }

  // horizontalAlign(elementList: any[], alignType = 'left'): void {
  //     let allX: number[] = [];
  //     if (alignType === 'left') {
  //         allX = elementList.map(element => element.x);
  //     } else if (alignType === 'right') {
  //         allX = elementList.map(element => element.x + element.width);
  //     }

  //     const meanX = math.mean(allX);
  //     for (const element of elementList) {
  //         element.x = meanX;
  //     }
  // }

  // verticalAlign(elementList: any[], alignType = 'top'): void {
  //     let allY: number[] = [];
  //     if (alignType === 'top') {
  //         allY = elementList.map(element => element.y);
  //     } else if (alignType === 'bottom') {
  //         allY = elementList.map(element => element.y + element.height);
  //     }

  //     const meanY = math.mean(allY);
  //     for (const element of elementList) {
  //         element.y = meanY;
  //     }
  // }

  // // createBindingArrows(element1: any, element2: any, padding = 10, startArrowhead = 'arrow', endArrowhead = 'arrow'): any {
  // //     if (!(element1 instanceof primitives.Rectangle || element1 instanceof primitives.Text)) {
  // //         throw new Error('element1 must be an instance of Rectangle or Text');
  // //     }
  // //     if (!(element2 instanceof primitives.Rectangle || element2 instanceof primitives.Text)) {
  // //         throw new Error('element2 must be an instance of Rectangle or Text');
  // //     }

  // //     const center1 = element1.center;
  // //     const center2 = element2.center;
  // //     const dx = center2[0] - center1[0];
  // //     const dy = center2[1] - center1[1];
  // //     const theta = math.atan2(dy, dx);
  // //     const invertedTheta = (theta + math.pi) % (2 * math.pi) - math.pi;
  // //     const point1 = element1.getEdgeMidpoint(theta, padding);
  // //     const point2 = element2.getEdgeMidpoint(invertedTheta, padding);
  // //     const points = [[0, 0], [point2[0] - point1[0], point2[1] - point1[1]]];

  // //     const line = new primitives.Arrow({ x: point1[0], y: point1[1], points });
  // //     line.setStartBinding(element1, padding);
  // //     line.setEndBinding(element2, padding);
  // //     line.startArrowhead = startArrowhead;
  // //     line.endArrowhead = endArrowhead;
  // //     return line;
  // // }

  // renderNetworkxGraph(graph: any, contentKey = 'label', scaleFactor = 500, setTextToCode = true, directed = true, padding = 10): void {
  //     const nodeDict: any = {};
  //     const edges: any[] = [];

  //     for (const nodeName of graph.nodes()) {
  //         const node = graph.node(nodeName);
  //         let content = node[contentKey];
  //         if (!Array.isArray(content)) {
  //             content = [content];
  //         }
  //         const textGroup = this.createTextBlock(content, padding, setTextToCode);
  //         const backgroundColor = randomHexColor();
  //         const outGroup = this.createBoundingElement(textGroup, 'Ellipse', backgroundColor, padding, true, true);
  //         const nodePosition = node.pos.map((pos: number) => pos * scaleFactor);
  //         outGroup.x = Math.round(nodePosition[0]);
  //         outGroup.y = Math.round(-nodePosition[1]);
  //         nodeDict[nodeName] = outGroup;
  //     }

  //     for (const edge of graph.edges()) {
  //         const [inKey, outKey] = edge;
  //         const inGroup = nodeDict[inKey];
  //         const outGroup = nodeDict[outKey];
  //         const inBBox = inGroup.elements[0];
  //         const outBBox = outGroup.elements[0];
  //         // const arrow = this.createBindingArrows(inBBox, outBBox, padding, undefined, directed ? 'arrow' : undefined);
  //         // edges.push(arrow);
  //     }

  //     for (const edge of edges) {
  //         this.drawObjs.push(edge);
  //     }
  //     for (const group of Object.values(nodeDict)) {
  //         // TODO
  //         // for (const element of group.elements) {
  //         //     this.drawObjs.push(element);
  //         // }
  //     }
  // }
}

