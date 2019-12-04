exports.config = {
  runner: 'local',

  specs: ['./test/*.spec.js'],

  capabilities: [
    {
      browserName: 'firefox'
    }
  ],
  logLevel: 'info',

  baseUrl: 'https://github.com/webdriverio/',

  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  services: ['selenium-standalone'],
  framework: 'mocha',
  reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
};
