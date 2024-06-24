import * as fs from 'fs';
import * as path from 'path';
import * as tmp from 'tmp-promise';
import { Icon, SketchBuilder } from '../src/cdk-arch';
import { Rectangle, Text } from '../src/cdk-arch/primitives';

tmp.setGracefulCleanup();

test('Sketchbuilder with Custom Icon', async () => {

    const icon = new Icon();

    icon.box = new Rectangle({ x: 0, y: 0, width: 100, height: 100 });
    icon.text = new Text({ x: 60, y: 120, text: 'Hello World' });

    const tmpDirectory = await tmp.dir({
      unsafeCleanup: true,
    });
    const filepath = path.join(tmpDirectory.path, 'test.excalidraw');

    const sb = new SketchBuilder();
    sb.icons['Custom Icon'] = icon;

    sb.exportToFile(filepath);
    expect(fs.existsSync(filepath)).toBe(true);

});
