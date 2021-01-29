from marshmallow import Schema, fields, validate, validates

from matiushin_medvedev.backend.web.dto.validation_utils import validate_blank_string


class StudentRequestSchema(Schema):
    name = fields.String(required=True)
    surname = fields.String(required=True)
    patronymic = fields.String(required=True)
    entry_date = fields.Date(required=True)
    education_form = fields.String(validate=validate.OneOf(['FULL_TIME', 'EVENING', 'PART_TIME']), required=True)
    group_num = fields.String(required=True)

    @validates("name")
    def validate_name(self, value):
        validate_blank_string(value)

    @validates("surname")
    def validate_surname(self, value):
        validate_blank_string(value)

    @validates("patronymic")
    def validate_patronymic(self, value):
        validate_blank_string(value)

    @validates("group_num")
    def validate_name(self, value):
        validate_blank_string(value)
