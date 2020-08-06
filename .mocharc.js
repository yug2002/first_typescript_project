const path = require('path');
const SIXTY_SECS = 300000;
const allureArtifactsDir = process.env.OUTDIR
  ? path.join(process.env.OUTDIR, 'allure-results')
  : 'allure-results';

module.exports = {
  timeout: SIXTY_SECS,
  spec: path.resolve('./dist/test/**/*.spec.js'),
  opts: false,
  reporter: 'spec',
  // reporter: 'mocha-allure-reporter',  
  // reporterOption: [ 'targetDir=' + allureArtifactsDir ],
  ui: 'bdd',
  parallel: false
}