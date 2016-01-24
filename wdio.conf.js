const selenium = require('selenium-standalone');
var seleniumServer;

exports.config = {

    /**
     * server configurations
     */
    host: '0.0.0.0',
    port: 4444,

    /**
     * specify test files
     */
    specs: [
        'test/*.spec.js'
    ],

    /**
     * capabilities
     */
    capabilities: [{
        browserName: 'firefox'
    }],

    /**
     * test configurations
     */
    // logLevel: 'silent',
    coloredLogs: true,
    screenshotPath: 'shots',
    // baseUrl: 'https://github.com/webdriverio',
    baseUrl: 'http://www.webdriver.io/',
    waitforTimeout: 10000,
    framework: 'mocha',

    reporters: ['dot', 'allure'],
    reporterOptions: {
        outputDir: './allure-results'
    },

    mochaOpts: {
        ui: 'bdd'
    },

    onPrepare: function() {
        return new Promise((resolve, reject) => {
            selenium.start((err, process) => {
                if(err) {
                    return reject(err);
                }
                seleniumServer = process;
                resolve(process);
            })
        });
    },
    onComplete: function() {
        seleniumServer.kill();
    }

};
