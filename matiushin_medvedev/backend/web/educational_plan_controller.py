import collections

from flask import Blueprint, request
from flask_api import status

from matiushin_medvedev.backend import db
from matiushin_medvedev.backend.db.educational_plan import EducationalPlan
from matiushin_medvedev.backend.web.controller_utils import response_to_json, request_to_json
from matiushin_medvedev.backend.web.dto.educational_plan_schema import EducationalPlanSchema

educational_plan_controller = Blueprint('educational_plan_controller', __name__)


@educational_plan_controller.route('/educational_plans/', methods=['POST'])
def create_educational_plan():
    request_body = request_to_json(request, EducationalPlanSchema())
    educational_plan = EducationalPlan(request_body['spec_name'],
                                       request_body['discipline'],
                                       request_body['hours'],
                                       request_body['examination_form'])
    db.session.add(educational_plan)
    db.session.commit()
    print(educational_plan)
    return response_to_json(get_educational_plan_response(educational_plan)), status.HTTP_201_CREATED


@educational_plan_controller.route('/educational_plans/', methods=['GET'])
def get_all_educational_plans():
    educational_plans = [get_educational_plan_response(ep) for ep in EducationalPlan.query.all()]
    return response_to_json(educational_plans)


@educational_plan_controller.route('/educational_plans/<educational_plan>', methods=['GET'])
def get_educational_plan(educational_plan):
    educational_plan = EducationalPlan.query.get_or_404(educational_plan)
    return response_to_json(get_educational_plan_response(educational_plan))


@educational_plan_controller.route('/educational_plans/<educational_plan>', methods=['PUT'])
def update_educational_plan(educational_plan):
    educational_plan = EducationalPlan.query.get_or_404(educational_plan)
    request_body = request_to_json(request, EducationalPlanSchema())
    educational_plan.spec_name = request_body['spec_name']
    educational_plan.discipline = request_body['discipline']
    educational_plan.hours = request_body['hours']
    educational_plan.examination_form = request_body['examination_form']
    db.session.add(educational_plan)
    db.session.commit()
    return response_to_json(get_educational_plan_response(educational_plan))


@educational_plan_controller.route('/educational_plans/<educational_plan>', methods=['DELETE'])
def delete_educational_plan(educational_plan):
    educational_plan = EducationalPlan.query.get_or_404(educational_plan)
    db.session.delete(educational_plan)
    db.session.commit()
    return '', status.HTTP_204_NO_CONTENT


@educational_plan_controller.route('/educational_plans/<educational_plan_id>/gradebooks', methods=['GET'])
def get_educational_plan_gradebook_data(educational_plan_id):
    result_set = db.session.execute("SELECT s.surname     as surname,\n"
                                    "       s.id as student_id,\n"
                                    "       ep.discipline as discipline,\n"
                                    "       g.year        as year,\n"
                                    "       g.mark        as mark\n"
                                    "FROM educational_plan as ep\n"
                                    "         LEFT JOIN gradebook g on ep.id = g.educational_plan_id\n"
                                    "         LEFT JOIN student s on s.id = g.student_id\n"
                                    "WHERE ep.id = :educational_plan_id",
                                    {'educational_plan_id': educational_plan_id})
    discipline = ''
    years_to_marks = collections.defaultdict(list)
    for row in result_set:
        discipline = row.discipline
        if row.surname is not None and row.mark is not None:
            years_to_marks[row.year].append({
                'student_id': row.student_id,
                'mark': row.mark
            })
    gradebooks = []
    if years_to_marks:
        gradebooks = [{'year': year, 'students_marks': marks} for year, marks in years_to_marks.items() if
                      years_to_marks]
    return response_to_json({
        'discipline': discipline,
        'gradebooks': gradebooks
    })


def get_educational_plan_response(educational_plan):
    return {
        'id': educational_plan.id,
        'spec_name': educational_plan.spec_name,
        'discipline': educational_plan.discipline,
        'hours': educational_plan.hours,
        'examination_form': educational_plan.examination_form
    }
