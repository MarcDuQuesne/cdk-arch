// export { Lambda } from './lambda';
import { IConstruct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';
import { uuid } from 'uuidv4';
import * as primitives from '../primitives';

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
};


export class Icon {

  public iconElements: primitives.ExcaliDrawPrimitive[] = [];
  public box: primitives.Rectangle = new primitives.Rectangle({});
  public text: primitives.Text = new primitives.Text({ originalText: '' });

  readonly iconPath: string = path.join(__dirname);

  readonly icons: { [key: string]: string } = {
    Function: 'lambda.json',
    Bucket: 'bucket.json',
  };


  constructor(node: IConstruct) {
    const iconFile = path.join(this.iconPath, this.icons[node.constructor.name]);
    const iconGroupId = uuid();
    this.loadJsonIcon(iconFile, node, iconGroupId);
  };

  public loadJsonIcon(iconFile: string, node: IConstruct, iconGroupId: string): void {
    const content = JSON.parse(fs.readFileSync(iconFile, 'utf8'));
    for (const element of content.elements) {

      const obj = new (<any>primitives)[capitalize(element.type)](element);
      obj.groupIds.push(node.node.id);

      if (element.boundingBox) {
        this.box = obj;
      } else if (obj.type === 'text') {
        this.text = obj;
      } else {
        obj.groupIds.push(iconGroupId);
        this.iconElements.push(obj);
      }
    };

    this.moveIcon(-this.box.x, -this.box.y);

  }

  public moveIcon(x: number, y: number): void {
    for (const element of this.iconElements) {
      element.x += x;
      element.y += y;
    }
    this.box.x += x;
    this.box.y += y;
    this.text.x += x;
    this.text.y += y;
  }

  public elements(): primitives.ExcaliDrawPrimitive[] {
    return this.iconElements.concat(this.box, this.text);
  };
}
