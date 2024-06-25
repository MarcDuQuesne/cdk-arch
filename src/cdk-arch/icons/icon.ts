import { IConstruct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';
import { uuid } from 'uuidv4';
import * as primitives from '../primitives';

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
};


export class Icon {

    static readonly iconPath: string = path.join(__dirname);

    // Supported icons
    static readonly icons: { [key: string]: string } = {
        Function: 'lambda.json',
        Bucket: 'bucket.json',
    };

    public iconElements: primitives.ExcaliDrawPrimitive[] = [];
    public box: primitives.Rectangle = new primitives.Rectangle({});
    public text: primitives.Text = new primitives.Text({ text: '' });

    static fromConstruct(node: IConstruct): Icon {
        const iconFile = path.join(this.iconPath, this.icons[node.constructor.name]);
        const icon = new Icon();
        icon.loadJsonIcon(iconFile, node);
        icon.text.text = node.node.id;
        return icon;
    }

    public loadJsonIcon(iconFile: string, node: IConstruct): void {
        const content = JSON.parse(fs.readFileSync(iconFile, 'utf8'));
        const iconGroupId = uuid();

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

        this.translate(-this.box.x, -this.box.y);
        this.scale(100.0 / this.box.width);

    }

    public translate(x: number, y: number): void {
        for (const element of this.iconElements) {
            element.translate(x, y);
        }
        this.box.translate(x, y);
        this.text.translate(x, y);
    }

    public scale(ratio: number): void {
        for (const element of this.iconElements) {
            element.scale(ratio);
        }
        this.box.scale(ratio);
        this.text.scale(ratio);
    }


    public elements(): primitives.ExcaliDrawPrimitive[] {
        return this.iconElements.concat(this.box, this.text);
    };
}
