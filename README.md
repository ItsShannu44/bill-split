# bill-split

Split a restaurant bill between friends: GST, tip, equal or share-based splits, accurate to the paisa.
Plain Node.js, no dependencies. Tests use Node's built-in runner.

```bash
npm test
```

```js
const { settleDinner } = require('./src');
settleDinner({ amount: 1000, people: 4, tipPercent: 10 });
// { total: 1298, shares: [324.5, 324.5, 324.5, 324.5], pretty: ['₹324.50', ...] }
```

## Lazarus demo: break it on purpose

CI (`.github/workflows/ci.yml`) syntax-checks every file and runs the tests on every branch.
Make **one** of these edits on GitHub (pencil icon → commit to `main`), wait for CI to go red,
and Lazarus wakes up, fixes it and opens a PR.

| # | Bug | File | Change this | To this | CI shows |
|---|---|---|---|---|---|
| 1 | Syntax error | `src/split.js` | `for (let i = 0; i < people; i++) {` | `for (let i = 0; i < people; i++ {` | `SyntaxError: Unexpected token '{'` |
| 2 | Wrong maths | `src/split.js` | `Math.floor(totalPaise / people)` | `Math.floor(totalPaise * people)` | 3 failing tests |
| 3 | Typo in a function name | `src/split.js` | `isLast ? roundTo(total - assigned)` | `isLast ? rountTo(total - assigned)` | `ReferenceError` |
| 4 | Off-by-one | `src/split.js` | `(i < remainder ? 1 : 0)` | `(i <= remainder ? 1 : 0)` | 3 failing tests |
| 5 | Wrong GST rate | `src/money.js` | `rate = 0.18` | `rate = 1.18` | 2 failing tests |

Do one bug at a time and merge Lazarus's PR before the next one.
