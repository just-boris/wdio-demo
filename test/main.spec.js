const expect = require('../util/matchers');

describe('Organization page', function() {
  beforeEach(function() {
    // force page reload
    browser.url('about:blank');
    browser.url('');
    browser.$('.HeaderMenu').waitForExist();
  });

  it('list repositories', function() {
    expect(browser.$$('.repo-list .public')).toHaveLength(13);
  });

  it('open project page', function() {
    browser.$('.repo-list .public [href="/webdriverio/webdriverio"]').click();
    browser.$('.repository-content').waitForExist();
    expect(browser.getUrl()).toBe('https://github.com/webdriverio/webdriverio');
    expect(
      browser
        .$$('.files .content')
        .slice(1, 6)
        .map(element => element.getText())
    ).toEqual(['.github', 'docs', 'e2e', 'examples', 'packages']);
  });

  afterEach(function() {
    if (this.currentTest.state !== 'passed') {
      browser.takeScreenshot();
    }
  });
});
