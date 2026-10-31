'use strict';

/** Round to 2 decimal places (paise), avoiding floating point surprises like 1.005. */
function roundTo(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/** Format an amount the Indian way: ₹1,23,456.50 */
function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Add GST (default 18%) to an amount. */
function withGST(amount, rate = 0.18) {
  return roundTo(amount * (1 + rate));
}

module.exports = { roundTo, formatINR, withGST };
