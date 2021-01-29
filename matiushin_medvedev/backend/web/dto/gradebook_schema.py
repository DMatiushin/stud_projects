from marshmallow import Schema, fields
from marshmallow.validate import Range


class GradebookSchema(Schema):
    student_id = fields.Integer(min=1, required=True)
    educational_plan_id = fields.Integer(min=1, required=True)
    year = fields.Integer(validate=Range(min=2000), required=True)
    mark = fields.Integer(validate=Range(min=0, max=5), required=True)
