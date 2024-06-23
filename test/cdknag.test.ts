import * as cdk from 'aws-cdk-lib';
import { Annotations, Match } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { ExampleStack } from '../examples/example-stack';

describe('Nag Warnings', () => {

  test.each([
    { stack: new ExampleStack(new cdk.App(), 'ExampleStack') },
  ])('Nag Errors for %p', ({ stack }) => {

    cdk.Aspects.of(stack).add(new AwsSolutionsChecks({ verbose: true }));

    NagSuppressions.addStackSuppressions(stack, [
      {
        id: 'AwsSolutions-S1',
        reason: 'S3 bucket is used for testing purposes',
      },
      {
        id: 'AwsSolutions-S10',
        reason: 'S3 bucket is used for testing purposes',
      },
    ]);

    const warnings = Annotations.fromStack(stack).findWarning(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    expect(warnings).toHaveLength(0);
  });
});

describe('Nag Errors', () => {

  test.each([
    { stack: new ExampleStack(new cdk.App(), 'ExampleStack') },
  ])('Nag Errors for %p', ({ stack }) => {

    cdk.Aspects.of(stack).add(new AwsSolutionsChecks({ verbose: true }));

    NagSuppressions.addStackSuppressions(stack, [
      {
        id: 'AwsSolutions-S1',
        reason: 'S3 bucket is used for testing purposes',
      },
      {
        id: 'AwsSolutions-S10',
        reason: 'S3 bucket is used for testing purposes',
      },
      {
        id: 'AwsSolutions-IAM4',
        reason: 'IAM policy is used for testing purposes',
      },
    ]);

    const errors = Annotations.fromStack(stack).findError(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    expect(errors).toHaveLength(0);
  });

});
