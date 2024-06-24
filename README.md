# CDK Arch

This library aims at providing a way to autogenerate architectural diagrams for CDK projects.

This library is  written using the wonderful [projen](https://github.com/projen/projen) framework.

# Installation

The library is available on npmjs.com and can be installed using:

`npm i cdk-arch`

And on pypi:

`pip install cdk-arch`

# Usage Examples

As an example, let's consider the following CDK app:

```typescript
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class ExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'Bucket');
    const lfunction = new lambda.Function(this, 'Lambda', {
        ...
    });
  }
}

const app = new cdk.App();
new ExampleStack(app, 'ExampleStack', {
env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'eu-west-1',
},
});

```

and imagine that in the diagram we want to show the bucket, the lambda function and an arrow connecting the two.
This can be accomplished by changing the code as follows:


```typescript
export class ExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'Bucket');
    const lfunction = new lambda.Function(this, 'Lambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log('event', event);
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Hello from Lambda!' }),
          };
        };
      `),
      environment: {
        BUCKET_NAME: bucket.bucketName,
      },
    });

    // We add some metadata to the resources to be able to position them in the diagram
    bucket.node.addMetadata('CDKArch Element', { x: 0, y: 0 });
    lfunction.node.addMetadata('CDKArch Element', { x: 300, y: 0 });
    // We add a connection between the bucket and the lambda function
    bucket.node.addMetadata('CDKArch Connection', { startId: bucket.node.id, endId: lfunction.node.id });

  }
}

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
```

where we added some metadata to the resources to instruct the SketchBuilder to position two icons in the diagram and a connection between the two,
and we added an aspect to the app to instruct the SketchBuilder to generate it when the app is synthetized.

This is the resulting diagram:

![Example Diagram](./examples/simple_case.png)

# Contributors

Matteo Giani <matteo.giani.87@gmail.com>