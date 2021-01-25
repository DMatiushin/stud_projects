from matiushin_medvedev.backend import db


class Gradebook(db.Model):
    __tablename__ = 'gradebook'

    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), primary_key=True)
    educational_plan_id = db.Column(db.Integer, db.ForeignKey('educational_plan.id'), primary_key=True)
    year = db.Column(db.Integer())
    mark = db.Column(db.Integer())

    def __init__(self, student_id, educational_plan_id, year, mark):
        self.student_id = student_id
        self.educational_plan_id = educational_plan_id
        self.year = year
        self.mark = mark

    def __repr__(self):
        return f"Gradebook(st={self.student_id}, ep={self.educational_plan_id}, year={self.year} mark={self.mark})"
