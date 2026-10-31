"""Marks -> grade -> grade points -> SGPA / CGPA (10-point scale)."""
from __future__ import annotations

from dataclasses import dataclass

# (minimum marks, grade, grade points), best first
GRADE_TABLE = [
    (90, "S", 10),
    (80, "A", 9),
    (70, "B", 8),
    (60, "C", 7),
    (50, "D", 6),
    (40, "E", 5),
    (0, "F", 0),
]


@dataclass
class Course:
    name: str
    credits: int
    marks: float


def grade_for(marks: float) -> tuple[str, int]:
    """Letter grade and grade points for marks out of 100."""
    if not 0 <= marks <= 100:
        raise ValueError("marks must be between 0 and 100")
    for minimum, grade, points in GRADE_TABLE:
        if marks >= minimum:
            return grade, points
    return "F", 0


def sgpa(courses: list[Course]) -> float:
    """Credit-weighted average of grade points for one semester."""
    total_credits = sum(c.credits for c in courses)
    if total_credits == 0:
        raise ValueError("no credits")
    weighted = sum(grade_for(c.marks)[1] * c.credits for c in courses)
    return round(weighted / total_credits, 2)


def cgpa(semesters: list[tuple[float, int]]) -> float:
    """CGPA from (sgpa, credits) pairs, weighted by each semester's credits."""
    total_credits = sum(credits for _, credits in semesters)
    if total_credits == 0:
        raise ValueError("no credits")
    return round(sum(s * credits for s, credits in semesters) / total_credits, 2)
