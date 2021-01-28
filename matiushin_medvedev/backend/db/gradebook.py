from matiushin_medvedev.backend import db
from matiushin_medvedev.backend.db.educational_plan import EducationalPlan
from matiushin_medvedev.backend.db.student import Student


class Gradebook(db.Model):
    __tablename__ = 'gradebook'

    student_id = db.Column(db.Integer, db.ForeignKey(Student.id), primary_key=True)
    educational_plan_id = db.Column(db.Integer, db.ForeignKey(EducationalPlan.id), primary_key=True)
    year = db.Column(db.Integer())
    mark = db.Column(db.Integer())

    def __init__(self, student, educational_plan, year, mark):
        self.student_id = student.id
        self.educational_plan_id = educational_plan.id
        self.year = year
        self.mark = mark

    def __repr__(self):
        return f"Gradebook(st={self.student_id}, ep={self.educational_plan_id}, year={self.year} mark={self.mark})"
