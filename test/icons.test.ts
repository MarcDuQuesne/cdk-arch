
import * as path from 'path';
import { read } from '../src/cdk-arch/icons';
import { ExcaliDrawPrimitive } from '../src/cdk-arch/primitives';

// write a test that reads the lambda.json file and checks that the result is an array of ExcaliDrawPrimitives
test.each([
  'lambda.json',
])('Read icon %s', ( iconFile ) => {
  const elements = read(path.join(__dirname, '..', 'src', 'cdk-arch', 'icons', iconFile));
  expect(elements).toBeInstanceOf(Array);
  expect(elements.length).toBeGreaterThan(0);
  for (const element of elements) {
    expect(element instanceof ExcaliDrawPrimitive).toBe(true);
  }
});
