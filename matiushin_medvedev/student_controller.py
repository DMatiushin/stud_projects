from flask import Blueprint, request

from matiushin_medvedev.controller_utils import convert_to_json

student_controller = Blueprint('student_controller', __name__)


@student_controller.route('/students/', methods=['POST'])
def create_student():
    request_body = request.json
    return convert_to_json({
        'id': 1,
        'name': request_body['name'],
        'surname': request_body['surname'],
        'patronymic': request_body['patronymic'],
        'entry_date': request_body['entry_date'],
        'education_form': request_body['education_form'],
        'group_num': request_body['group_num'],
    }), 201


@student_controller.route('/students/', methods=['GET'])
def get_all_students():
    return convert_to_json([
        {
            'id': 1,
            'name': "request.name",
            'surname': "request.surname",
            'patronymic': "request.patronymic",
            'entry_date': "request.entry_date",
            'education_form': "request.education_form",
            'group_num': "request.group_num"
        },
        {
            'id': 2,
            'name': "request.name",
            'surname': "request.surname",
            'patronymic': "request.patronymic",
            'entry_date': "request.entry_date",
            'education_form': "request.education_form",
            'group_num': "request.group_num"
        }
    ])


@student_controller.route('/students/<student_id>', methods=['GET'])
def get_student(student_id):
    return convert_to_json({
        'id': student_id,
        'name': "request.name",
        'surname': "request.surname",
        'patronymic': "request.patronymic",
        'entry_date': "request.entry_date",
        'education_form': "request.education_form",
        'group_num': "request.group_num"
    })


@student_controller.route('/students/<student_id>', methods=['PUT'])
def update_student(student_id):
    request_body = request.json
    return convert_to_json({
        'id': student_id,
        'name': request_body['name'],
        'surname': request_body['surname'],
        'patronymic': request_body['patronymic'],
        'entry_date': request_body['entry_date'],
        'education_form': request_body['education_form'],
        'group_num': request_body['group_num'],
    })


@student_controller.route('/students/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    return '', 204


@student_controller.route('/students/count', methods=['GET'])
def count_students_by_educational_form():
    educational_form = request.args.get("educational_form")
    return convert_to_json({
        'educational_form': educational_form,
        'students_total': 0
    })
