import enum

from matiushin_medvedev import db


class EducationForm(enum.Enum):
    FULL_TIME = 'FULL_TIME'
    EVENING = 'EVENING'
    PART_TIME = 'PART_TIME'

    def __str__(self):
        return self.value


class Student(db.Model):
    __tablename__ = 'student'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    surname = db.Column(db.String())
    patronymic = db.Column(db.String())
    entry_date = db.Column(db.DateTime())
    education_form = db.Column(db.Enum(EducationForm))
    group_num = db.Column(db.String())

    def __init__(self, name, surname, patronymic,
                 entry_date, education_form, group_num):
        self.name = name
        self.surname = surname
        self.patronymic = patronymic
        self.entry_date = entry_date
        self.education_form = education_form
        self.group_num = group_num

    def __repr__(self):
        return f"Student({self.id})"
