"""Grade calculator: marks to grades, SGPA, CGPA and attendance."""
from .attendance import attendance_percent, can_sit_exam, classes_needed
from .calc import cgpa, grade_for, sgpa

__all__ = ["attendance_percent", "can_sit_exam", "cgpa", "classes_needed", "grade_for", "sgpa"]
