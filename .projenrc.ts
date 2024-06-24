import { awscdk } from 'projen';

const cdkVersion = '2.116.0';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Matteo Giani',
  authorAddress: 'matteo.giani.87@gmail.com',
  cdkVersion: cdkVersion,
  defaultReleaseBranch: 'main',
  minNodeVersion: '18.16.1',
  jsiiVersion: '~5.4.0',
  name: 'cdk-arch',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/MarcDuQuesne/cdk-arch',
  deps: ['tmp-promise'],
  publishToPypi: {
    distName: 'cdk-arch',
    module: 'cdk_arch',
  },
  description: 'L3-level cdk constructs for DMS',
  devDeps: ['eslint-plugin-cdk', 'cdk-nag'],
  peerDeps: [],
  bundledDeps: ['uuidv4', 'tmp-promise'],
  packageName: 'cdk-arch',
  gitignore: [
    'cdk.out',
    '*.js',
    '*.d.ts',
    '.github-token',
    '.pypi*',
  ],
});

project.eslint?.addPlugins('cdk');
project.eslint?.addRules({
  'cdk/construct-ctor': 'error',
  'cdk/construct-props-struct-name': 'error',
  // 'cdk/filename-match-regex': 'error',  // TODO: enable
  'cdk/public-static-property-all-caps': 'error',
  'cdk/no-static-import': 'error',
  'cdk/stack-props-struct-name': 'error',
  'cdk/prefer-type-only-imports': 'error',
});

project.synth();
