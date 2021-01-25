from flask import Blueprint, request
from flask_api import status

from matiushin_medvedev import db
from matiushin_medvedev.student import Student
from matiushin_medvedev.web.controller_utils import convert_to_json

student_controller = Blueprint('student_controller', __name__)


@student_controller.route('/students/', methods=['POST'])
def create_student():
    request_body = request.json
    student = Student(request_body['name'],
                      request_body['surname'],
                      request_body['patronymic'],
                      request_body['entry_date'],
                      request_body['education_form'],
                      request_body['group_num'])
    db.session.add(student)
    db.session.commit()
    return convert_to_json(get_student_response(student)), status.HTTP_201_CREATED


@student_controller.route('/students/', methods=['GET'])
def get_all_students():
    students = [get_student_response(student) for student in Student.query.all()]
    return convert_to_json(students)


@student_controller.route('/students/<student_id>', methods=['GET'])
def get_student(student_id):
    student = Student.query.get_or_404(student_id)
    return convert_to_json(get_student_response(student))


@student_controller.route('/students/<student_id>', methods=['PUT'])
def update_student(student_id):
    student = Student.query.get_or_404(student_id)
    request_body = request.json
    student.name = request_body['name']
    student.surname = request_body['surname']
    student.patronymic = request_body['patronymic']
    student.entry_date = request_body['entry_date']
    student.education_form = request_body['education_form']
    student.group_num = request_body['group_num']
    db.session.add(student)
    db.session.commit()
    return convert_to_json(get_student_response(student))


@student_controller.route('/students/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = Student.query.get_or_404(student_id)
    db.session.delete(student)
    db.session.commit()
    return '', status.HTTP_204_NO_CONTENT


@student_controller.route('/students/count', methods=['GET'])
def count_students_by_educational_form():
    education_form = request.args.get("education_form")
    count = Student.query.filter_by(education_form=education_form).count()
    return convert_to_json({
        'educational_form': education_form,
        'students_total': count
    })


def get_student_response(student):
    return {
        'id': student.id,
        'name': student.name,
        'surname': student.surname,
        'patronymic': student.patronymic,
        'entry_date': student.entry_date,
        'education_form': student.education_form,
        'group_num': student.group_num
    }
