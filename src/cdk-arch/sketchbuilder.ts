import * as cdk from 'aws-cdk-lib';
import { IConstruct, MetadataEntry } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';
import { Icon } from './icons';
import { Arrow, Point, Rectangle, RectangleProps, Text, vectorLength } from './primitives';

export interface AppState {
  readonly viewBackgroundColor: string;
  readonly gridSize: any;
}

// function compareNumbers(a: number, b: number): number {
//   if (a - b > 1) {
//     return 1;
//   } else if ((a - b < 1) && (a - b > 0)) {
//     return 0;
//   } else {
//     return -1;
//   }
// }

export class SketchBuilder {

  data: any;
  constructsIcon: { [key: string]: Icon } = {};
  arrows: Arrow[] = [];
  boundingElements: Rectangle[] = [];
  texts: Text[] = [];

  arrowIconGap: number = 0.75; // 0.5 is the minimum to make the arrow not touch the icon

  private delayedArrows: any[] = [];
  private delayedBoundingElements: any[] = [];
  private delayedStacks: { [key: string]: { elements: string[], region: string, account: string } } = {};

  constructor() {
    this.data = {
      type: 'excalidraw',
      version: 1,
      source: 'CDK Arch Sketch Builder',
      elements: [],
      appState: {
        viewBackgroundColor: '#ffffff',
        gridSize: null,
      },
    };
    this.constructsIcon = {};
  }

  public visit(node: IConstruct): void {

    const metadataList = node.node.metadata;

    if (node instanceof cdk.Stack) {

      const icon = new Icon();
      icon.loadJsonIcon(path.join(Icon.iconPath, 'account.json'), node);
      icon.text.text = `Account: ${node.account}`

      this.constructsIcon[node.node.id] = icon;

      this.delayedStacks[(node as cdk.Stack).node.id] = {
        elements: [],
        region: (node as cdk.Stack).region,
        account: (node as cdk.Stack).account,
      };
    }

    for (const metadata of metadataList) {
      if (metadata.type === 'CDKArch Element') {
        this.addIconForConstruct(node, metadata);
        const stackName = node.node.scope!.node.id;
        this.delayedStacks[stackName]['elements'].push(node.node.id);
      }
      if (metadata.type === 'CDKArch Connection') {
        this.registerArrow(metadata.data.startId, metadata.data.endId);
      }
      // if (metadata.type === 'CDKArch BoundingElement') {
      //   this.registerBoudingElement(metadata.data);
      // }
    }
  }

  addIconForConstruct(node: IConstruct, metadata: MetadataEntry): void {
    this.constructsIcon[node.node.id] = Icon.fromConstruct(node);
    this.constructsIcon[node.node.id].translate(metadata.data.x, metadata.data.y);
    if ('text' in metadata.data) {
      this.constructsIcon[node.node.id].text.text = metadata.data.text;
    }
  }

  // We register the need for a connection, but delay this up to when all the icons are there.
  registerArrow(startNodeId: string, endNodeId: string) {
    this.delayedArrows.push([startNodeId, endNodeId]);
  }

  registerBoudingElement(boundingElements: string[]) {
    this.delayedBoundingElements.push(boundingElements);
  }

  addArrow(startNodeId: string, endNodeId: string): string {

    if (!(startNodeId in this.constructsIcon)) {
      throw new Error(`Icon with group ID ${startNodeId} not found.`);
    }
    if (!(endNodeId! in this.constructsIcon)) {
      throw new Error(`Icon with group ID ${endNodeId} not found.`);
    }

    // find an icon in this.Icon that contains a groupId called startnodeId, and return the boundaryBox Id.
    const startIcon = this.constructsIcon[startNodeId];
    const endIcon = this.constructsIcon[endNodeId];

    // points without gap
    const points: Point[] = [
      [0, 0],
      [
        endIcon.box.x - startIcon.box.x + (endIcon.box.width - startIcon.box.width) / 2,
        endIcon.box.y - startIcon.box.y + (endIcon.box.height - startIcon.box.width) / 2,
      ],
    ];

    // points with gap
    const vlength = vectorLength(points[1]);
    points[0] = [points[1][0] / vlength * startIcon.box.width * this.arrowIconGap, points[1][1] / vlength * startIcon.box.height * this.arrowIconGap];
    points[1] = [points[1][0] / vlength * (vlength - startIcon.box.width * this.arrowIconGap), points[1][1] / vlength * (vlength - startIcon.box.height * this.arrowIconGap)];

    const arrow = new Arrow({
      startBinding: { elementId: startIcon.box.id, focus: 0, gap: startIcon.box.height * (this.arrowIconGap - 0.5) },
      endBinding: { elementId: endIcon.box.id, focus: 0, gap: endIcon.box.height * (this.arrowIconGap - 0.5) },
      points: points,
      x: startIcon.box.x + startIcon.box.width / 2,
      y: startIcon.box.y + startIcon.box.height / 2,
      width: points[1][0] - points[0][0],
      height: points[1][1] - points[0][1],
    });
    this.arrows.push(arrow);

    for (const obj of [startIcon.box, endIcon.box]) {
      obj.addBoundElement(arrow);
    }
    return arrow.id;
  }

  exportToFile(savePath: string): void {

    for (const [stackId, stackProps] of Object.entries(this.delayedStacks)) {
      this.addStackBoundingElement(stackId, stackProps);
    }

    for (const icon of Object.values(this.constructsIcon)) {
      this.data.elements = this.data.elements.concat(icon.elements());
    }

    for (const [startId, endId] of this.delayedArrows) {
      this.addArrow(startId, endId);
    }

    for (const arrow of this.arrows) {
      this.data.elements.push(arrow);
    }

    // for (const ids of this.delayedBoundingElements) {
    //   this.addBoundingElement(ids)
    // }

    // for (const boundingElement of this.boundingElements) {
    //   this.data.elements.push(boundingElement);
    // }

    // for (const text of this.texts) {
    //   this.data.elements.push(text);
    // }

    if (!savePath.endsWith('.excalidraw')) {
      savePath += '.excalidraw';
    }

    fs.writeFileSync(savePath, JSON.stringify(this.data, null, 4));
  }

  boundingElement(nodeIds: string[], padding: number = 20, args?: RectangleProps): Rectangle {

    const boxes = nodeIds.map((nodeId) => this.constructsIcon[nodeId].box);
    const texts = nodeIds.map((nodeId) => this.constructsIcon[nodeId].text);

    const elements = boxes.concat(texts);

    const minX = Math.min(...elements.map((element) => element.x));
    const minY = Math.min(...elements.map((element) => element.y));

    const maxX = Math.max(...elements.map((element) => element.x + element.width));
    const maxY = Math.max(...elements.map((element) => element.y + element.height));

    const boundingElement = new Rectangle({
      x: minX - padding,
      y: minY - 4*padding,
      width: maxX - minX + 2 * padding,
      height: maxY - minY + 6 * padding,
      strokeColor: "#e03131",
      backgroundColor: "transparent",
      ...args,
    });

    return boundingElement;
  }

  addboundingElement(nodeIds: string[], padding: number = 20, args?: RectangleProps): string {
    const boundingElement = this.boundingElement(nodeIds, padding, args)
    this.boundingElements.push(boundingElement);
    return boundingElement.id;
  };

  addStackBoundingElement(stackId: string, stackProps: any, padding: number = 20): any {

    const x = this.constructsIcon[stackId].box.x
    const y = this.constructsIcon[stackId].box.y;
    this.constructsIcon[stackId].box = this.boundingElement(stackProps.elements, padding);

    this.constructsIcon[stackId].box.width = Math.max(this.constructsIcon[stackId].box.width, this.constructsIcon[stackId].text.width + 2 * padding);

    for (const element of this.constructsIcon[stackId].iconElements) {
      element.translate(this.constructsIcon[stackId].box.x - x, this.constructsIcon[stackId].box.y -y);
    }
    this.constructsIcon[stackId].text.translate(this.constructsIcon[stackId].box.x - x, this.constructsIcon[stackId].box.y - y);
  }

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

