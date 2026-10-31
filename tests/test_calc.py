import pytest

from grades.calc import Course, cgpa, grade_for, sgpa


@pytest.mark.parametrize(
    "marks, expected",
    [
        (95, ("S", 10)),
        (90, ("S", 10)),
        (89.5, ("A", 9)),
        (70, ("B", 8)),
        (40, ("E", 5)),
        (39, ("F", 0)),
    ],
)
def test_grade_for_boundaries(marks, expected):
    assert grade_for(marks) == expected


def test_grade_for_rejects_impossible_marks():
    with pytest.raises(ValueError):
        grade_for(101)
    with pytest.raises(ValueError):
        grade_for(-1)


def test_sgpa_is_credit_weighted():
    courses = [Course("Maths", 4, 92), Course("Physics", 3, 75), Course("Lab", 1, 55)]
    # (10*4 + 8*3 + 6*1) / 8 = 70 / 8
    assert sgpa(courses) == 8.75


def test_cgpa_weights_semesters_by_credits():
    assert cgpa([(9.0, 20), (8.0, 20)]) == 8.5
    assert cgpa([(9.0, 24), (7.0, 16)]) == 8.2
