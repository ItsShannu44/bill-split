'use strict';

const { roundTo } = require('./money');

function assertPeople(people) {
  if (!Number.isInteger(people) || people <= 0) {
    throw new Error('people must be a positive whole number');
  }
}

/**
 * Split a total equally. Paise that don't divide evenly go to the first people,
 * so the parts always add back up to the exact total.
 */
function splitEqual(total, people) {
  assertPeople(people);
  const totalPaise = Math.round(total * 100);
  const base = Math.floor(totalPaise / people);
  const remainder = totalPaise - base * people;
  const parts = [];
  for (let i = 0; i < people; i++) {
    parts.push((base + (i < remainder ? 1 : 0)) / 100);
  }
  return parts;
}

/** Split a total by shares, e.g. { asha: 2, ravi: 1 } -> asha pays two thirds. */
function splitByShares(total, shares) {
  const names = Object.keys(shares);
  if (names.length === 0) throw new Error('need at least one person');
  const totalShares = names.reduce((sum, name) => sum + shares[name], 0);
  const result = {};
  let assigned = 0;
  names.forEach((name, i) => {
    const isLast = i === names.length - 1;
    const amount = isLast ? roundTo(total - assigned) : roundTo((total * shares[name]) / totalShares);
    result[name] = amount;
    assigned = roundTo(assigned + amount);
  });
  return result;
}

/** Add a tip percentage to a bill. */
function withTip(total, percent) {
  if (percent < 0) throw new Error('tip cannot be negative');
  return roundTo(total + (total * percent) / 100);
}

module.exports = { splitEqual, splitByShares, withTip };
