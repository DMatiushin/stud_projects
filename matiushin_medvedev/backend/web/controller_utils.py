import json

from flask import Response
from marshmallow import ValidationError


def response_to_json(response):
    return Response(json.dumps(response, default=str, ensure_ascii=False), mimetype='application/json')


def request_to_json(request, schema=None):
    json_request = json.loads(request.data.decode('windows-1251'))
    if schema:
        errors = schema.validate(json_request)
        if errors:
            raise ValidationError(errors)
    return json_request
