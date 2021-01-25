import json

from flask import Response


def convert_to_json(response):
    return Response(json.dumps(response), mimetype='application/json')
