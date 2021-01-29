from marshmallow import fields, Schema, validate, validates
from marshmallow.validate import Range

from matiushin_medvedev.backend.web.dto.validation_utils import validate_blank_string


class EducationalPlanSchema(Schema):
    spec_name = fields.String(required=True)
    discipline = fields.String(required=True)
    hours = fields.Integer(validate=Range(min=1))
    examination_form = fields.String(validate=validate.OneOf(['EXAM', 'TEST']), required=True)

    @validates("spec_name")
    def validate_spec_name(self, value):
        validate_blank_string(value)

    @validates("discipline")
    def validate_discipline(self, value):
        validate_blank_string(value)
