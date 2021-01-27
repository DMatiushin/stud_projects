import json

from flask import Response


def response_to_json(response):
    return Response(json.dumps(response, default=str, ensure_ascii=False), mimetype='application/json')


def request_to_json(request):
    return json.loads(request.data.decode('windows-1251'))
