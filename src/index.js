'use strict';

const { splitEqual, splitByShares, withTip } = require('./split');
const { formatINR, withGST } = require('./money');

/** Everything a dinner bill needs: GST, tip, then an equal split. */
function settleDinner({ amount, people, tipPercent = 0, gst = true }) {
  const taxed = gst ? withGST(amount) : amount;
  const total = withTip(taxed, tipPercent);
  const shares = splitEqual(total, people);
  return { total, shares, pretty: shares.map(formatINR) };
}

module.exports = { settleDinner, splitEqual, splitByShares, withTip, withGST, formatINR };
