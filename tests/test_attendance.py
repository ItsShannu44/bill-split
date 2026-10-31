import pytest

from grades.attendance import attendance_percent, can_sit_exam, classes_needed


def test_attendance_percent():
    assert attendance_percent(30, 40) == 75.0
    assert attendance_percent(1, 3) == 33.33


def test_attendance_rejects_bad_input():
    with pytest.raises(ValueError):
        attendance_percent(5, 0)
    with pytest.raises(ValueError):
        attendance_percent(11, 10)


def test_exactly_75_percent_can_sit_the_exam():
    assert can_sit_exam(30, 40)
    assert not can_sit_exam(29, 40)


def test_classes_needed_to_reach_75():
    assert classes_needed(30, 40) == 0
    assert classes_needed(20, 40)==40  # (20+40)/(40+40) = 75%
