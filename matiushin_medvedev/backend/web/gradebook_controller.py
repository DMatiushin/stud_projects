from flask import Blueprint, request
from flask_api import status
from werkzeug.exceptions import NotFound

from matiushin_medvedev.backend import db
from matiushin_medvedev.backend.db.educational_plan import EducationalPlan
from matiushin_medvedev.backend.db.gradebook import Gradebook
from matiushin_medvedev.backend.db.student import Student
from matiushin_medvedev.backend.web.controller_utils import response_to_json, request_to_json
from matiushin_medvedev.backend.web.dto.gradebook_schema import GradebookSchema

gradebook_controller = Blueprint('gradebook_controller', __name__)


@gradebook_controller.route('/gradebooks/', methods=['POST'])
def set_mark():
    request_body = request_to_json(request, GradebookSchema())
    student = Student.query.get_or_404(request_body['student_id'])
    educational_plan = EducationalPlan.query.get_or_404(request_body['educational_plan_id'])
    gradebook = Gradebook(student=student,
                          educational_plan=educational_plan,
                          year=request_body['year'],
                          mark=request_body['mark'])
    db.session.add(gradebook)
    db.session.commit()
    return response_to_json(get_gradebook_response(gradebook)), status.HTTP_201_CREATED


@gradebook_controller.route('/gradebooks/', methods=['PUT'])
def update_mark():
    request_body = request_to_json(request, GradebookSchema())
    gradebook = Gradebook.query.filter_by(student_id=request_body['student_id'],
                                          educational_plan_id=request_body['educational_plan_id'],
                                          year=request_body['year']).first()
    print(gradebook)
    if gradebook is None:
        raise NotFound
    gradebook.mark = request_body['mark']
    db.session.add(gradebook)
    db.session.commit()
    return response_to_json(get_gradebook_response(gradebook))


@gradebook_controller.route('/gradebooks/', methods=['DELETE'])
def remove_mark():
    request_body = request_to_json(request)
    gradebook = Gradebook.query.filter_by(student_id=request_body['student_id'],
                                          educational_plan_id=request_body['educational_plan_id']).first()
    if gradebook is None:
        return '', status.HTTP_404_NOT_FOUND
    db.session.delete(gradebook)
    db.session.commit()
    return '', 204


def get_gradebook_response(gradebook):
    return {
        'student_id': gradebook.student_id,
        'educational_plan_id': gradebook.educational_plan_id,
        'year': gradebook.year,
        'mark': gradebook.mark
    }
