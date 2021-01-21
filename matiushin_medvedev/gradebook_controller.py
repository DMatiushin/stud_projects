from flask import Blueprint, request

from matiushin_medvedev.controller_utils import convert_to_json

gradebook_controller = Blueprint('gradebook_controller', __name__)


@gradebook_controller.route('/gradebooks/', methods=['POST'])
def set_mark():
    request_body = request.json
    return convert_to_json({
        'student_surname': request_body['student_id'],
        'discipline_name':  request_body['discipline_id'],
        'year':  request_body['year'],
        'mark':  request_body['mark']
    }), 201
