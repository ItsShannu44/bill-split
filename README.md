# grade-calc

College grade calculator: marks → letter grade, SGPA, CGPA, and the 75% attendance rule.
Plain Python, tested with pytest, linted with ruff.

```bash
pip install -r requirements.txt
ruff check .
pytest -q
```

```python
from grades.calc import Course, sgpa
sgpa([Course("Maths", 4, 92), Course("Physics", 3, 75), Course("Lab", 1, 55)])  # 8.75
```

## Lazarus demo: break it on purpose

CI (`.github/workflows/ci.yml`) installs, lints and tests on every branch. Make **one** of these
edits on GitHub (pencil icon → commit to `main`); CI goes red and Lazarus fixes it.

| # | Bug | File | Change this | To this | CI fails at |
|---|---|---|---|---|---|
| 1 | Syntax error | `grades/calc.py` | `if not 0 <= marks <= 100:` | `if not 0 <= marks <= 100` (drop the `:`) | Lint: invalid syntax |
| 2 | Typo in an attribute | `grades/calc.py` | `* c.credits for c in courses` | `* c.credit for c in courses` | Tests: AttributeError |
| 3 | Off-by-one boundary | `grades/calc.py` | `if marks >= minimum:` | `if marks > minimum:` | Tests: 3 failing |
| 4 | Wrong formula | `grades/calc.py` | `weighted / total_credits` | `weighted / len(courses)` | Tests: 1 failing |
| 5 | 75% rule broken | `grades/attendance.py` | `>= MIN_ATTENDANCE` | `> MIN_ATTENDANCE` | Tests: 1 failing |
| 6 | Undefined variable | `grades/attendance.py` | `attended * 100 / held` | `attended * 100 / total` | Lint: F821 undefined name |
| 7 | Unused import | `grades/attendance.py` | `import math` | `import math` + new line `import os` | Lint: F401 |

One bug at a time; merge Lazarus's PR before the next one.
