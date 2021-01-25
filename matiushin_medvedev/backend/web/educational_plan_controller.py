from flask import Blueprint, request
from flask_api import status

from matiushin_medvedev.backend import db
from matiushin_medvedev.backend.db.educational_plan import EducationalPlan
from matiushin_medvedev.backend.web.controller_utils import convert_to_json

educational_plan_controller = Blueprint('educational_plan_controller', __name__)


@educational_plan_controller.route('/educational_plans/', methods=['POST'])
def create_educational_plan():
    request_body = request.json
    educational_plan = EducationalPlan(request_body['spec_name'],
                                       request_body['discipline'],
                                       request_body['hours'],
                                       request_body['examination_form'])
    db.session.add(educational_plan)
    db.session.commit()
    return convert_to_json(get_educational_plan_response(educational_plan)), status.HTTP_201_CREATED


@educational_plan_controller.route('/educational_plans/', methods=['GET'])
def get_all_educational_plans():
    educational_plans = [get_educational_plan_response(ep) for ep in EducationalPlan.query.all()]
    return convert_to_json(educational_plans)


@educational_plan_controller.route('/educational_plans/<educational_plan>', methods=['GET'])
def get_educational_plan(educational_plan):
    educational_plan = EducationalPlan.query.get_or_404(educational_plan)
    return convert_to_json(get_educational_plan_response(educational_plan))


@educational_plan_controller.route('/educational_plans/<educational_plan>', methods=['PUT'])
def update_educational_plan(educational_plan):
    educational_plan = EducationalPlan.query.get_or_404(educational_plan)
    request_body = request.json
    educational_plan.spec_name = request_body['spec_name']
    educational_plan.discipline = request_body['discipline']
    educational_plan.hours = request_body['hours']
    educational_plan.examination_form = request_body['examination_form']
    db.session.add(educational_plan)
    db.session.commit()
    return convert_to_json(get_educational_plan_response(educational_plan))


@educational_plan_controller.route('/educational_plans/<educational_plan>', methods=['DELETE'])
def delete_educational_plan(educational_plan):
    educational_plan = EducationalPlan.query.get_or_404(educational_plan)
    db.session.delete(educational_plan)
    db.session.commit()
    return '', status.HTTP_204_NO_CONTENT


@educational_plan_controller.route('/educational_plans/<educational_plan>/gradebooks', methods=['GET'])
def get_educational_plan_gradebook_data(educational_plan):
    return convert_to_json({
        'educational_plan': educational_plan,
        'discipline': 'discipline',
        'gradebooks': [
            {
                'year': 2021,
                'students_marks': [
                    {
                        'surname': 'surname',
                        'mark': 4,
                    },
                    {
                        'surname': 'surname2',
                        'mark': 5,
                    }
                ]
            }
        ]
    })


def get_educational_plan_response(educational_plan):
    return {
        'id': educational_plan.id,
        'spec_name': educational_plan.spec_name,
        'discipline': educational_plan.discipline,
        'hours': educational_plan.hours,
        'examination_form': educational_plan.examination_form
    }
