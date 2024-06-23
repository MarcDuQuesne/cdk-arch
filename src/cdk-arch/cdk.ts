import { IAspect } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';
import { Icon } from './icons';
import { SketchBuilder } from './sketchbuilder';

export class Sketch implements IAspect {

  static sketchBuilder: SketchBuilder = new SketchBuilder();

  public static exportToFile(filepath: string) {
    Sketch.sketchBuilder.exportToFile(filepath);
  }

  public visit(node: IConstruct): void {

    const metadataList = node.node.metadata;

    // if the medatadat contains 'CDKArch':

    for (const metadata of metadataList) {
      if (metadata.type === 'CDKArch Element') {
        const icon = new Icon(node);
        for (const element of icon.elements) {
          Sketch.sketchBuilder.addElement(element);
        }
      }
      if (metadata.type === 'CDKArch Connection') {
        Sketch.sketchBuilder.addArrow(metadata.data.startId, metadata.data.endId);
      }

    }
  }
}
