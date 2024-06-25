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
    static scalingFactor: number = 1.0;

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

        // center this icon in the page
        this.translate(-this.box.x, -this.box.y);

        // scale the icon to 100px width
        // const scalefactor = 100.0 / this.box.width;
        // this.scale(scalefactor);
    }

    public translate(dx: number, dy: number): void {
        for (const element of this.iconElements) {
            element.translate(dx, dy);
        }
        this.box.translate(dx, dy);
        this.text.translate(dx, dy);
    }

    public scale(ratio: number): void {

        for (const element of this.iconElements) {
            element.scale(ratio);
            element.x = element.x * ratio;
            element.y = element.y * ratio;
        }
        this.box.scale(ratio);
        this.box.x = this.box.x * ratio;
        this.box.y = this.box.y * ratio;
        this.text.scale(ratio);
        this.text.x = this.text.x * ratio;
        this.text.y = this.text.y * ratio;
    }


    public elements(): primitives.ExcaliDrawPrimitive[] {
        return this.iconElements.concat(this.box, this.text);
    };
}
