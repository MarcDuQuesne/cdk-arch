import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

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
    bucket.node.addMetadata('CDKArch Element', { x: 200, y: 2500 });
    lfunction.node.addMetadata('CDKArch Element', { x: 500, y: 500 });
    // We add a connection between the bucket and the lambda function
    bucket.node.addMetadata('CDKArch Connection', { startId: bucket.node.id, endId: lfunction.node.id });
    bucket.node.addMetadata('CDKArch BoundingElement', [bucket.node.id, lfunction.node.id]);

  }
}