const webdriverio = require('webdriverio');
const expect = require('../util/matchers');

describe('Organization page', function(){
    beforeEach(function() {
        browser.url('/');
    })

    it('list repositiories', function() {
        expect(browser.elements('.repo-list-item').value).toHaveLength(20);
    });

    it('open next page', function() {
        browser.click('.next_page');
        browser.waitForExist('.repo-list-item');
        expect(browser.url().value).toBe('https://github.com/webdriverio?page=2');
        expect(browser.elements('.repo-list-item').value).toHaveGreaterLength(2);
    });

    it('open project page', function() {
        browser.click('.repo-list-item [href="/webdriverio/webdriverio"]');
        browser.waitForExist('.repository-content');
        expect(browser.url().value).toBe('https://github.com/webdriverio/webdriverio');
        expect(browser.getText('.files .content').slice(1, 6)).toEqual([
            'bin',
            'docs',
            'examples',
            'lib',
            'test'
        ]);
    });
});
