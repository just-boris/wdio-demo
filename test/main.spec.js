const expect = require('../util/matchers');

async function waitForSelector(selector) {
  await (await browser.$(selector)).waitForExist();
}

async function clickSelector(selector) {
  await (await browser.$(selector)).click();
}

async function dismissCookieBanner() {
  const acceptButton = await browser.$('.js-cookie-consent-accept');
  await acceptButton.click();
  await acceptButton.waitForDisplayed({ reverse: true });
}

describe('Organization page', function () {
  beforeEach(async () => {
    // force page reload
    await browser.url('about:blank');
    await browser.url('');
    await waitForSelector('.HeaderMenu');
  });

  it('list repositories', async () => {
    const elements = await browser.$$('.repo-list .public');
    expect(elements).toHaveLength(15);
  });

  it('open project page', async () => {
    await dismissCookieBanner();
    await clickSelector('.repo-list .public [href="/webdriverio/webdriverio"]');
    await waitForSelector('.repository-content');
    expect(await browser.getUrl()).toBe('https://github.com/webdriverio/webdriverio');
    const entries = await browser.$$('a[href*="/webdriverio/webdriverio/tree"]');
    expect(await Promise.all(entries.slice(1, 6).map((element) => element.getText()))).toEqual([
      '.github',
      'docs',
      'e2e',
      'examples',
      'packages',
    ]);
  });

  afterEach(async function () {
    if (this.currentTest.state !== 'passed') {
      await browser.takeScreenshot();
    }
  });
});
