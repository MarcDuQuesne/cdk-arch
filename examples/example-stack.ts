
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';


export class ExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'Bucket');
    // const lfunction = new lambda.Function(this, 'Lambda', {
    //   runtime: lambda.Runtime.NODEJS_20_X,
    //   handler: 'index.handler',
    //   code: lambda.Code.fromInline(`
    //     exports.handler = async function(event) {
    //       console.log('event', event);
    //       return {
    //         statusCode: 200,
    //         body: JSON.stringify({ message: 'Hello from Lambda!' }),
    //       };
    //     };
    //   `),
    //   environment: {
    //     BUCKET_NAME: bucket.bucketName,
    //   },
    // });

    bucket.node.addMetadata('CDKArch', { x: 1, y: 2 });
    // bucket.node.addMetadata('Connection', lfunction.node.id);

  }
}