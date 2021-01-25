from flask import Blueprint, request
from flask_api import status

from matiushin_medvedev.web.controller_utils import convert_to_json

gradebook_controller = Blueprint('gradebook_controller', __name__)


@gradebook_controller.route('/gradebooks/', methods=['POST'])
def set_mark():
    request_body = request.json
    return convert_to_json({
        'student_id': request_body['student_id'],
        'discipline_id': request_body['discipline_id'],
        'year': request_body['year'],
        'mark': request_body['mark']
    }), status.HTTP_201_CREATED


@gradebook_controller.route('/gradebooks/', methods=['PUT'])
def update_mark():
    request_body = request.json
    return convert_to_json({
        'student_id': request_body['student_id'],
        'discipline_id': request_body['discipline_id'],
        'year': request_body['year'],
        'mark': request_body['mark']
    })


@gradebook_controller.route('/gradebooks/', methods=['DELETE'])
def remove_mark():
    return '', 204
