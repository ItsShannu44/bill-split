'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { roundTo, formatINR, withGST } = require('../src/money');

test('roundTo handles floating point edge cases', () => {
  assert.equal(roundTo(1.005), 1.01);
  assert.equal(roundTo(2.345, 1), 2.3);
});

test('formatINR uses Indian digit grouping', () => {
  assert.equal(formatINR(123456.5), '₹1,23,456.50');
});

test('withGST adds 18% by default', () => {
  assert.equal(withGST(100), 118);
  assert.equal(withGST(100, 0.05), 105);
});

