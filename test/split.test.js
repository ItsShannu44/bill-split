'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { splitEqual, splitByShares, withTip } = require('../src/split');
const { settleDinner } = require('../src/index');

const sum = (xs) => Math.round(xs.reduce((a, b) => a + b, 0) * 100) / 100;

// test('splitEqual divides evenly', () => {
//   assert.deepEqual(splitEqual(300, 3), [100, 100, 100]);
});

test('splitEqual gives leftover paise to the first people and keeps the total exact', () => {
  const parts = splitEqual(100, 3);
  assert.deepEqual(parts, [33.34, 33.33, 33.33]);
  assert.equal(sum(parts), 100);
});

test('splitEqual rejects zero or fractional people', () => {
  assert.throws(() => splitEqual(100, 0));
  assert.throws(() => splitEqual(100, 1.5));
});

test('splitByShares splits proportionally and adds up exactly', () => {
  const r = splitByShares(90, { asha: 2, ravi: 1 });
  assert.deepEqual(r, { asha: 60, ravi: 30 });
  const odd = splitByShares(100, { a: 1, b: 1, c: 1 });
  assert.equal(sum(Object.values(odd)), 100);
});

test('withTip adds a percentage', () => {
  assert.equal(withTip(200, 10), 220);
  assert.throws(() => withTip(200, -5));
});

test('settleDinner applies GST, tip and an equal split', () => {
  const r = settleDinner({ amount: 1000, people: 4, tipPercent: 10 });
  assert.equal(r.total, 1298);
  assert.deepEqual(r.shares, [324.5, 324.5, 324.5, 324.5]);
  assert.equal(r.pretty[0], '₹324.50');
});
