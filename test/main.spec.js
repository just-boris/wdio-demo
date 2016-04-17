const webdriverio = require('webdriverio');
const expect = require('../util/matchers');

describe('Organization page', function(){
    beforeEach(function() {
        // force page reload
        browser.url('about:blank');
        browser.url('/');
        browser.waitForExist('.site-header');
    });

    it('list repositiories', function() {
        expect(browser.elements('.repo-list-item').value).toHaveLength(20);
    });

    it('open next page', function() {
        browser.click('.next_page');
        browser.waitForExist('.repo-list-item');
        expect(browser.getUrl()).toBe('https://github.com/webdriverio?page=2');
        expect(browser.elements('.repo-list-item').value).toHaveGreaterLength(2);
    });

    it('open project page', function() {
        browser.click('.repo-list-item [href="/webdriverio/webdriverio"]');
        browser.waitForExist('.repository-content');
        expect(browser.getUrl()).toBe('https://github.com/webdriverio/webdriverio');
        expect(browser.getText('.files .content').slice(1, 6)).toEqual([
            '.github',
            'bin',
            'docs',
            'examples',
            'lib'
        ]);
    });

    afterEach(function() {
        if(this.currentTest.state !== "passed") {
            browser.saveScreenshot();
        }
    });
});
