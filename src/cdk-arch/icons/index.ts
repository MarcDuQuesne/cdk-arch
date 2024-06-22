export { Lambda } from "./lambda";
import * as fs from 'fs';
import * as primitives from "../primitives";

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * This function reads an excalidraw (json) file and returns an array of ExcaliDrawPrimitives
 */
export function read(filePath: string): primitives.ExcaliDrawPrimitive[] {

    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const elements: primitives.ExcaliDrawPrimitive[] = [];

    for (const element of content.elements) {
        const obj = new (<any>primitives)[capitalize(element.type)](element)
        elements.push(obj);
    }

    return elements;
}
