"""Attendance rules: 75% to sit the exam."""
from __future__ import annotations

import math

MIN_ATTENDANCE = 75.0


def attendance_percent(attended: int, held: int) -> float:
    if held <= 0:
        raise ValueError("no classes held yet")
    if attended < 0 or attended > held:
        raise ValueError("attended must be between 0 and classes held")
    return round(attended * 100 / held, 2)


def can_sit_exam(attended: int, held: int) -> bool:
    return attendance_percent(attended, held) >= MIN_ATTENDANCE


def classes_needed(attended: int, held: int) -> int:
    """How many more classes in a row you must attend to reach 75%."""
    if can_sit_exam(attended, held):
        return 0
    # (attended + x) / (held + x) >= 0.75  ->  x >= (0.75*held - attended) / 0.25
    return math.ceil((MIN_ATTENDANCE / 100 * held - attended) / (1 - MIN_ATTENDANCE / 100))
