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

  const filepath = path.join('test.excalidraw');

  const app = new cdk.App();
  new ExampleStack(app, 'ExampleStack', {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: 'eu-west-1',
    },
  });

  Aspects.of(app).add(new SketchBuilder());

  app.synth();
  SketchBuilder.exportToFile(filepath);

  expect(fs.existsSync(filepath)).toBe(true);
});