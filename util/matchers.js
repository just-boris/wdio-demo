const expect = require('expect');

function assertArray(actual) {
  expect(actual && typeof actual.length === 'number').toExist('Expected to have a value with `length` property');
}

expect.extend({
  toHaveLength(length, message) {
    assertArray(this.actual);
    expect(this.actual.length).toEqual(length, message);
  },

  toHaveGreaterLength(length, message) {
    assertArray(this.actual);
    expect(this.actual.length).toBeGreaterThan(length, message);
  }
});

module.exports = expect;
