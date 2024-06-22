
import { uuid } from 'uuidv4';
import { ExcaliDrawPrimitive, ExcaliDrawPrimitiveProps, FillStyle, Line, Rectangle, RectangleProps, StrokeStyle } from "../primitives";
import { read } from "./index";


class Icon  {
    excalidrawElements: ExcaliDrawPrimitive[];
}


export class BackGround {

    groupId: string;
    rectangle: Rectangle;

    constructor() {
        this.groupId = uuid();
    }

  public background(props: RectangleProps) {
        return new Rectangle({
            "version": 1795,
            "versionNonce": 1704305491,
            "isDeleted": false,
            "fillStyle": FillStyle.CrossHatch,
            "strokeWidth": 2,
            "strokeStyle": StrokeStyle.Solid,
            "roughness": 0,
            "opacity": 100,
            "angle": 0,
            "x": props.x,
            "y": props.y,
            "width": 64.46115236495699,
            "height": 64.39942473426015,
            "strokeColor": props.strokeColor,
            "backgroundColor": props.backgroundColor,
            "groupIds": [
              // this.groupId
            ],
            "frameId": null,
            "roundness": null,
            "boundElements": [],
            "updated": 1718553311666,
            "link": null,
            "locked": false
          });
    }

  public computationalService(props: RectangleProps): Rectangle {
      this.rectangle = this.background({
        strokeColor: "#000000",
        backgroundColor: "#fd7e1488",
        ...props});
      return this.rectangle;
    }
}

export class Lambda extends Icon {
  constructor(props: ExcaliDrawPrimitiveProps) {
        super();

    const background = new BackGround().computationalService(props as RectangleProps);

    this.excalidrawElements = [
            background,
            new Line({
              "version": 962,
              "versionNonce": 223136288,
              "isDeleted": false,
              "fillStyle": FillStyle.CrossHatch,
              "strokeWidth": 2,
              "strokeStyle": StrokeStyle.Solid,
              "roughness": 0,
              "opacity": 100,
              "angle": 0,
              "x": props.x + 25.01,
              "y": props.y + 26.74,
              "strokeColor": "#000000",
              "backgroundColor": "transparent",
              "width": 19.307143399999998,
              "height": 26.897,
              "seed": 1528234474,
              "groupIds": null, //[
              //   background.props.groupIds[0]
              // ],
              "frameId": null,
              "roundness": null,
              "boundElements": [],
              "updated": 1718567050810,
              "link": null,
              "locked": false,
              "startBinding": null,
              "endBinding": null,
              "lastCommittedPoint": null,
              "startArrowhead": null,
              "endArrowhead": null,
              "points": [
                [
                  0,
                  0
                ],
                [
                  -12.730345799999998,
                  25.466
                ],
                [
                  -0.5178580999999962,
                  26.897
                ],
                [
                  6.576797599999999,
                  13.180999999999997
                ],
                [
                  0.8992804999999997,
                  0.5640000000000001
                ]
              ]
            }),
            new Line ({
              "isDeleted": false,
              "fillStyle": FillStyle.CrossHatch,
              "strokeWidth": 2,
              "strokeStyle": StrokeStyle.Solid,
              "roughness": 0,
              "opacity": 100,
              "angle": 0,
              "x": props.x + 49.57,
              "y": props.y + 42.63,
              "strokeColor": "#000000",
              "backgroundColor": "transparent",
              "width": 34.863799400000005,
              "height": 44,
              "seed": 896742570,
              "groupIds": [
                background.props.groupIds[0]
              ],
              "frameId": null,
              "roundness": null,
              "boundElements": [],
              "updated": 1718567050810,
              "link": null,
              "locked": false,
              "startBinding": null,
              "endBinding": null,
              "lastCommittedPoint": null,
              "startArrowhead": null,
              "endArrowhead": null,
              "points": [
                [
                  0,
                  0
                ],
                [
                  -14.960123300000012,
                  -32.42
                ],
                [
                  -29.1743317,
                  -33
                ],
                [
                  -30.178179700000005,
                  -23.001
                ],
                [
                  -22.897294200000005,
                  -22
                ],
                [
                  -7.866463500000002,
                  10.421999999999997
                ],
                [
                  3.689738799999993,
                  11
                ],
                [
                  4.685619699999997,
                  1.0000000000000002
                ],
                [
                  3.6897387999999935,
                  0
                ]
              ]
            })
          ];

    // {
    //   "type": "text",
    //   "version": 1289,
    //   "versionNonce": 847298046,
    //   "isDeleted": false,
    //   "id": "nEPAYpW2hIfc7cPAFuvwO",
    //   "fillStyle": "hachure",
    //   "strokeWidth": 1,
    //   "strokeStyle": "solid",
    //   "roughness": 1,
    //   "opacity": 100,
    //   "angle": 0,
    //   "x": 340.0700225830078,
    //   "y": -17.81858520760852,
    //   "strokeColor": "#000000",
    //   "backgroundColor": "transparent",
    //   "width": 72.85995483398438,
    //   "height": 24,
    //   "seed": 1996405789,
    //   "groupIds": [
    //     "4B-WLaRWV9jTygJTtAbIj"
    //   ],
    //   "frameId": null,
    //   "roundness": null,
    //   "boundElements": [],
    //   "updated": 1718554208417,
    //   "link": null,
    //   "locked": false,
    //   "fontSize": 20,
    //   "fontFamily": 1,
    //   "text": "Lambda",
    //   "textAlign": "center",
    //   "verticalAlign": "top",
    //   "containerId": null,
    //   "originalText": "Lambda",
    //   "lineHeight": 1.2,
    //   "baseline": 17
    // }
    }
}