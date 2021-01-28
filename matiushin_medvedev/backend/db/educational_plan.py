import enum

from matiushin_medvedev.backend.db.db_config import db


class ExaminationForm(enum.Enum):
    EXAM = 'EXAM'
    TEST = 'TEST'

    def __str__(self):
        return self.value


class EducationalPlan(db.Model):
    __tablename__ = 'educational_plan'

    id = db.Column(db.Integer, primary_key=True)
    spec_name = db.Column(db.String(255))
    discipline = db.Column(db.String(255))
    hours = db.Column(db.Integer())
    examination_form = db.Column(db.Enum(ExaminationForm))
    gradebooks = db.relationship("Gradebook", backref="educational_plan")

    def __init__(self, spec_name, discipline, hours, examination_form):
        self.spec_name = spec_name
        self.discipline = discipline
        self.hours = hours
        self.examination_form = examination_form

    def __repr__(self):
        return f"Educational plan({self.id})"
