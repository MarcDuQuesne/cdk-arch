import * as cdk from 'aws-cdk-lib';
import { Aspects } from 'aws-cdk-lib';
import * as fs from 'fs';
import * as path from 'path';
import * as tmp from 'tmp-promise';
import { ExampleStack } from '../examples/example-stack';
import { SketchBuilder } from '../src/cdk-arch';

tmp.setGracefulCleanup();

test('CDK Architecture from Stack', async () => {

  // const tmpDirectory = await tmp.dir({
  //   unsafeCleanup: true,
  // });
  // const filepath = path.join(tmpDirectory.path, 'exampleStack.excalidraw');
  const filepath = path.join('exampleStack.excalidraw');

  const app = new cdk.App();
  new ExampleStack(app, 'ExampleStack', {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: 'eu-west-1',
    },
  });

  const sketchbuilder = new SketchBuilder();
  Aspects.of(app).add(sketchbuilder);

  app.synth();
  sketchbuilder.exportToFile(filepath);

  expect(fs.existsSync(filepath)).toBe(true);
});