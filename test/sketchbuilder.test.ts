import * as fs from 'fs';
import * as path from 'path';
import * as tmp from 'tmp-promise';
import { SketchBuilder } from '../src/cdk-arch';
import { Rectangle } from '../src/cdk-arch/primitives';

tmp.setGracefulCleanup();

test ('SketchBuilder', async () => {

  // const tmpDirectory = await tmp.dir({
  //   unsafeCleanup: true,
  // });

  const filepath = path.join('test.excalidraw');

  // const sb = new SketchBuilder();
  // const id = sb.addElement(new Rectangle({ x: 0, y: 0, width: 100, height: 100 }));
  // expect(id !== undefined);
  // sb.exportToFile(filepath);
  expect(fs.existsSync(filepath)).toBe(true);

});