// import { Excalidraw, convertToExcalidrawElements } from "@excalidraw/excalidraw";
// import { Construct } from 'constructs';

// class ExcalidrawDrawing {
//     private elements: any[];

//     constructor() {
//         this.elements = [];
//     }

//     addElement(element: any) {
//         this.elements.push(element);
//     }

//     initializeDrawing() {
//     //     const convertedElements = convertToExcalidrawElements(this.elements);
//     //     return (

//     //         <Excalidraw
//     //     initialData= {{
//     //         elements: convertedElements,
//     //             appState: { zenModeEnabled: true, viewBackgroundColor: "#a5d8ff" },
//     //         scrollToContent: true,
//     //     }
//     // }
//     //   />
//     // );
//   }
// }

// function ExcalidrawDecorator(params?: { x?: number, y?: number, type?: string }) {
//     return function (target: Construct, propertyKey: string, descriptor: PropertyDescriptor) {
//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             const drawing = new ExcalidrawDrawing();
//             drawing.addElement({
//                 type: params?.type || 'rectangle',
//                 x: params?.x || 100,
//                 y: params?.y || 100,
//             });

//             const result = originalMethod.apply(this, args);

//             drawing.initializeDrawing();
//             return result;
//         };

//         return descriptor;
//     };
// }

// const elements = convertToExcalidrawElements([
//     {
//         "type": "rectangle",
//         "x": 10,
//         "y": 10,
//         "strokeWidth": 2,
//         "id": "1"
//     },
//     {
//         "type": "diamond",
//         "x": 120,
//         "y": 20,
//         "backgroundColor": "#fff3bf",
//         "strokeWidth": 2,
//         "label": {
//             "text": "HELLO EXCALIDRAW",
//             "strokeColor": "#099268",
//             "fontSize": 30
//         },
//         "id": "2"
//     },
//     {
//         "type": "frame",
//         "children": ["1", "2"],
//         "name": "My frame"
//     }]

// // Example usage:
// // @ExcalidrawDecorator({ type: 'ellipse', x: 150, y: 200 })
// // class MyConstruct extends Construct { ... }