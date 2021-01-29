from marshmallow import ValidationError


def validate_blank_string(value):
    if not value:
        raise ValidationError('Can not be blank')
