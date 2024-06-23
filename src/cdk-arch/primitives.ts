
// import { ImageFont } from 'imagefont';


import { uuid } from 'uuidv4';

enum PrimitiveType {
  Line = 'line',
  Rectangle = 'rectangle',
  Diamond = 'diamond',
  Ellipse = 'ellipse',
  Text = 'text',
  Arrow = 'arrow',
  Group = 'group'
}

export interface ExcaliDrawPrimitiveProps {
  readonly type?: string;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly groupIds?: string[];
}

export abstract class ExcaliDrawPrimitive {

  type: string = 'null';
  id: string = uuid();
  x: number = 0;
  y: number = 0;
  width: number = 100;
  height: number = 100;
  seed: number = Math.floor(Math.random() * 100000);
  isDeleted: boolean = false;
  frameId: number = 0;
  angle: number = 0;
  boundElements: string[] = [];
  updated: boolean = true;
  link: string = '';
  locked: boolean = false;
  version: number = 1;
  versionNonce: number = 2;
  groupIds: string[] = [];

  constructor(args: ExcaliDrawPrimitiveProps) {
    this.type = args.type || this.type;
    this.x = args?.x || this.x;
    this.y = args?.y || this.y;
    this.width = args?.width || this.width;
    this.height = args?.height || this.height;
    this.groupIds = args?.groupIds || this.groupIds;
  };
}

export interface Roundness {
  type: number;
}

export enum StrokeStyle {
  Solid = 'solid',
  Dashed = 'dashed',
  Dotted = 'dotted'
}

export enum FillStyle {
  Hachure = 'hachure',
  Solid = 'solid',
  CrossHatch = 'cross-hatch',
  Dots = 'dots'
}

export interface DrawnObjectProps extends ExcaliDrawPrimitiveProps {

  readonly strokeWidth?: number;
  readonly strokeStyle?: StrokeStyle;
  readonly strokeColor: string;
  readonly fillStyle?: FillStyle;
  readonly roughness?: number;
  readonly opacity?: number;
  readonly backgroundColor?: string;
  readonly roundness?: Roundness | null;
  readonly startBinding?: null;
  readonly endBinding?: null;
  readonly lastCommittedPoint?: null;
  readonly startArrowhead?: null;
  readonly endArrowhead?: null;
  readonly points: number[][];

}

export abstract class DrawnObject extends ExcaliDrawPrimitive {

  strokeColor: string = '#000000';
  strokeWidth: number = 1;
  strokeStyle: StrokeStyle = StrokeStyle.Solid;
  fillStyle: FillStyle = FillStyle.Hachure;
  roughness: number = 1;
  opacity: number = 100;
  backgroundColor: string = '#ffffff';
  roundness: Roundness | null = null;
  startBinding: null = null;
  endBinding: null = null;
  lastCommittedPoint: null = null;
  startArrowhead: null = null;
  endArrowhead: null = null;
  points: number[][] = [];

  constructor(args: LineProps) {

    super(args);
    this.strokeColor = args.strokeColor || this.strokeColor;
    this.points = args.points || this.points;
    this.fillStyle = args.fillStyle || this.fillStyle;
    this.strokeWidth = args.strokeWidth || this.strokeWidth;
    this.strokeStyle = args.strokeStyle || this.strokeStyle;
    this.roughness = args.roughness || this.roughness;
    this.opacity = args.opacity || this.opacity;
    this.backgroundColor = args.backgroundColor || this.backgroundColor;
    this.roundness = args.roundness || this.roundness;
    this.startBinding = args.startBinding || this.startBinding;
    this.endBinding = args.endBinding || this.endBinding;
    this.lastCommittedPoint = args.lastCommittedPoint || this.lastCommittedPoint;
    this.startArrowhead = args.startArrowhead || this.startArrowhead;
    this.endArrowhead = args.endArrowhead || this.endArrowhead;
  }
}

export interface LineProps extends DrawnObjectProps {

  readonly roughness?: number;
  readonly opacity?: number;
  readonly strokeColor: string;
  readonly backgroundColor?: string;
  readonly startBinding?: null;
  readonly endBinding?: null;
  readonly lastCommittedPoint?: null;
  readonly startArrowhead?: null;
  readonly endArrowhead?: null;
  readonly points: number[][];

}

export class Line extends DrawnObject {

  startBinding: null = null;
  endBinding: null = null;
  lastCommittedPoint: null = null;
  startArrowhead: null = null;
  endArrowhead: null = null;
  points: number[][] = [];

  constructor(args: LineProps) {

    super({
      type: PrimitiveType.Line,
      ...args,
    });
    this.startBinding = args.startBinding || this.startBinding;
    this.endBinding = args.endBinding || this.endBinding;
    this.lastCommittedPoint = args.lastCommittedPoint || this.lastCommittedPoint;
    this.startArrowhead = args.startArrowhead || this.startArrowhead;
    this.endArrowhead = args.endArrowhead || this.endArrowhead;
    this.points = args.points || this.points;
  }
}


export interface RectangleProps extends DrawnObjectProps {}

export class Rectangle extends DrawnObject {

  constructor(args: RectangleProps) {
    super({
      type: PrimitiveType.Rectangle,
      ...args,
    });
  }
}

export interface TextProps extends DrawnObjectProps {
  fontFamily?: number;
  textAlign?: string;
  verticalAlign?: string;
  containerId?: number | null;
  originalText: string;
  lineHeight?: number;
  baseline?: number;
}


export class Text extends ExcaliDrawPrimitive {

  fontFamily: number = 1;
  textAlign: string = 'center';
  verticalAlign: string = 'top';
  containerId: number | null = null;
  originalText: string;
  lineHeight: number = 1.2;
  baseline: number = 17;

  constructor(args: TextProps) {
    super({
      type: PrimitiveType.Text,
      ...args,
    });

    this.fontFamily = args.fontFamily || this.fontFamily;
    this.textAlign = args.textAlign || this.textAlign;
    this.verticalAlign = args.verticalAlign || this.verticalAlign;
    this.containerId = args.containerId || this.containerId;
    this.originalText = args.originalText;
    this.lineHeight = args.lineHeight || this.lineHeight;
    this.baseline = args.baseline || this.baseline;
  }
}

// //     constructor(setToCode = false, ...args: any[]) {
// //         super(...args);

// //         if ("text" in (args as any)[0]) {
// //             (args as any)[0].text = String((args as any)[0].text);
// //         }

// //         const selectedDict = setToCode ? CODE_TEXT : TEXT_DEFAULTS;

// //         for (const [key, value] of Object.entries(selectedDict)) {
// //             if (key === "width" || key === "height") {
// //                 continue;
// //             }
// //             if (["fontFamily", "fontSize", "text"].includes(key)) {
// //                 (this as any)[`_${key}`] = value;
// //             } else {
// //                 (this as any)[key] = typeof value === 'object' ? { ...value } : value;
// //             }
// //         }

// //         this._updateFont();
// //         for (const [key, value] of Object.entries((args as any)[0])) {
// //             if (key === "width" || key === "height") {
// //                 continue;
// //             }
// //             (this as any)[key] = value;
// //         }

// //         this.text = this._text;
// //         this.type = "text";
// //         this.exportKeys = TEXT_EXPORT_KEYS;
// //     }

// //     private _updateFont(): void {
// //         // this._fontFile = FONT_FAMILY[this._fontFamily];
// //         // this._font = new ImageFont(this._fontFile, this._fontSize);
// //     }

// //     private _updateSize(): void {
// //         [this._width, this._height] = this._font.getSize(this._text);
// //     }

// //     get fontFamily(): string {
// //         return this._fontFamily;
// //     }

// //     set fontFamily(value: string) {
// //         this._fontFamily = value;
// //         this._updateFont();
// //     }

// //     get fontSize(): number {
// //         return this._fontSize;
// //     }

// //     set fontSize(value: number) {
// //         this._fontSize = value;
// //         this._updateFont();
// //     }

// //     get text(): string {
// //         return this._text;
// //     }

// //     set text(value: string) {
// //         this._text = value;
// //         (this as any).originalText = value;
// //         this._updateSize();
// //     }

// //     // get width(): number {
// //     //     return this._width;
// //     // }

// //     // get height(): number {
// //     //     return this._height;
// //     // }
// // }

// // public bbox(): number[] {
// //     return [this.props.x, this.y, this.x + this.width, this.y + this.height];
// // }

// // public center(): number[] {
// //     return [this.props.x + this.width / 2, this.y + this.height / 2];
// // }

// // getBoundaryPoint(theta: number): number[] {
// //     const thetaLim = Math.atan2(this.height, this.width);
// //     let x: number;
// //     let y: number;
// //     if (Math.abs(theta) < thetaLim) {
// //         x = this.x + this.width * (Math.abs(theta) < Math.PI / 2 ? 1 : 0);
// //         y = this.y + (this.height / 2) + (this.width / 2 * Math.tan(theta));
// //     } else {
// //         const signIndicator = theta < Math.PI ? 1 : 0;
// //         x = this.x + this.width / 2 + (this.height / 2 * (1 / (Math.tan(theta) + EPSILON)) * (-1 + 2 * signIndicator));
// //         y = this.y + this.height * (theta < Math.PI ? 1 : 0) * signIndicator;
// //     }
// //     return [x, y];
// // }

// // getEdgeMidpoint(theta: number, padding = 5): number[] {
// //     const thetaLim = Math.atan2(this.height, this.width);
// //     let x: number;
// //     let y: number;
// //     if (Math.abs(theta) < thetaLim || Math.abs(theta) > Math.PI - thetaLim) {
// //         const signIndicator = Math.abs(theta) < Math.PI / 2 ? 1 : 0;
// //         x = this.x + this.width * signIndicator + padding * (-1 + 2 * signIndicator);
// //         y = this.y + (this.height / 2);
// //     } else {
// //         const signIndicator = theta > 0 ? 1 : 0;
// //         x = this.x + this.width / 2;
// //         y = this.y + this.height * signIndicator + padding * (-1 + 2 * signIndicator);
// //     }
// //     return [x, y];
// // }


// // export class Group extends ExcaliDrawPrimitive {
// //     type: string;
// //     elementIds: Set<string>;
// //     elements: ExcaliDrawPrimitive[];
// //     private _x: number;
// //     private _y: number;
// //     private _width: number;
// //     private _height: number;

// //     constructor() {
// //         super();
// //         this.type = "group";
// //         this.elementIds = new Set();
// //         this.elements = [];
// //         this.exportKeys = ["type", "elementIds"];
// //         this._x = 0;
// //         this._y = 0;
// //         this._width = 0;
// //         this._height = 0;
// //     }

// //     addElement(element: ExcaliDrawPrimitive): void {
// //         if (element instanceof Group) {
// //             for (const elem of element.elements) {
// //                 this.addElement(elem);
// //             }
// //         } else {
// //             if (!this.elementIds.has(element.id)) {
// //                 this.elements.push(element);
// //                 this.elementIds.add(element.id);
// //                 (element as any).groupIds.push(this.id);
// //             }
// //         }
// //         this._updateBbox();
// //     }

// //     removeElement(element: ExcaliDrawPrimitive): void {
// //         if (this.elementIds.has(element.id)) {
// //             this.elements = this.elements.filter(elem => elem.id !== element.id);
// //             this.elementIds.delete(element.id);
// //             (element as any).groupIds = (element as any).groupIds.filter((groupId: string) => groupId !== this.id);
// //         }
// //         this._updateBbox();
// //     }

// //     emptyAllSubelements(): void {
// //         const elements = [...this.elements];
// //         for (const element of elements) {
// //             this.removeElement(element);
// //         }
// //     }

// //     private _updateBbox(): void {
// //         const allStarts = this.elements.map(element => [element.props.x, element.y]);
// //         const minX = Math.min(...allStarts.map(start => start[0]));
// //         const minY = Math.min(...allStarts.map(start => start[1]));

// //         const allEnds = this.elements.map(element => [element.x + element.width, element.y + element.height]);
// //         const maxX = Math.max(...allEnds.map(end => end[0]));
// //         const maxY = Math.max(...allEnds.map(end => end[1]));

// //         this._x = minX;
// //         this._y = minY;
// //         this._width = maxX - minX;
// //         this._height = maxY - minY;
// //     }

// //     // get x(): number {
// //     //     return this._x;
// //     // }

// //     // set x(value: number) {
// //     //     const delta = value - this._x;
// //     //     for (const element of this.elements) {
// //     //         element.x += delta;
// //     //     }
// //     //     this._x = value;
// //     // }

// //     // get y(): number {
// //     //     return this._y;
// //     // }

// //     // set y(value: number) {
// //     //     const delta = value - this._y;
// //     //     for (const element of this.elements) {
// //     //         element.y += delta;
// //     //     }
// //     //     this._y = value;
// //     // }

// //     // get width(): number {
// //     //     return this._width;
// //     // }

// //     // get height(): number {
// //     //     return this._height;
// //     // }
// // }

// // // export class Diamond extends Rectangle {
// // //     constructor(...args: any[]) {
// // //         super(false, ...args);
// // //         this.type = "diamond";
// // //     }

// // //     getBoundaryPoints(theta: number): void {
// // //         // TODO: Implement this.
// // //     }
// // // }

// // // export class Ellipse extends Rectangle {
// // //     constructor(...args: any[]) {
// // //         super(false, ...args);
// // //         this.type = "ellipse";
// // //     }

// // //     getBoundaryPoints(theta: number): void {
// // //         // TODO: Implement this.
// // //     }
// // // }


// // export class Line extends ExcaliDrawPrimitive {
// //     type: string;
// //     private _width: number;
// //     private _height: number;
// //     private _points: number[][];

// //     private startBinding: any;
// //     private endBinding: any;

// //     constructor(...args: any[]) {
// //         super(...args);

// //         const selectedDict = this instanceof Arrow ? ARROW_DEFAULTS : LINE_DEFAULTS;

// //         for (const [key, value] of Object.entries(selectedDict)) {
// //             if (["width", "height", "points"].includes(key)) {
// //                 continue;
// //             }
// //             (this as any)[key] = typeof value === 'object' ? { ...value } : value;
// //         }

// //         this.points = selectedDict.points;

// //         for (const [key, value] of Object.entries((args as any)[0])) {
// //             (this as any)[key] = value;
// //         }
// //         this.exportKeys = LINE_EXPORT_KEYS;
// //         this.type = "line";
// //     }

// //     // get width(): number {
// //     //     return this._width;
// //     // }

// //     // get height(): number {
// //     //     return this._height;
// //     // }

// //     get points(): number[][] {
// //         return this._points;
// //     }

// //     set points(values: number[][]) {
// //         let xyShift: [number, number] = [0, 0];
// //         if (values[0][0] !== 0 || values[0][1] !== 0) {
// //             values = values.map(point => [point[0] - values[0][0], point[1] - values[0][1]]);
// //             xyShift = [values[0][0], values[0][1]];
// //         }

// //         this._points = [...values];
// //         this.x += xyShift[0];
// //         this.y += xyShift[1];

// //         const minX = 0 // Math.min(...allPoints.map(point => point[0]));
// //         const minY = 10 // Math.min(...allPoints.map(point => point[1]));
// //         const maxX = 0 //Math.max(...allPoints.map(point => point[0]));
// //         const maxY = 10 //Math.max(...allPoints.map(point => point[1]));

// //         this._width = maxX - minX;
// //         this._height = maxY - minY;
// //     }

// //     setStartBinding(element: any, padding = 10): void {
// //         this.startBinding = {
// //             elementId: element.id,
// //             focus: 0,
// //             gap: padding
// //         };
// //         element.boundElements.push({
// //             id: this.id,
// //             type: 'arrow'
// //         });
// //     }

// //     setEndBinding(element: any, padding = 10): void {
// //         this.endBinding = {
// //             elementId: element.id,
// //             focus: 0,
// //             gap: padding
// //         };
// //         element.boundElements.push({
// //             id: this.id,
// //             type: 'arrow'
// //         });
// //     }
// // }

// // export class Arrow extends Line {

// //     startArrowhead: string;
// //     endArrowhead: string;

// //     constructor(...args: any[]) {
// //         super(...args);
// //         this.type = 'arrow';
// //     }
// // }
