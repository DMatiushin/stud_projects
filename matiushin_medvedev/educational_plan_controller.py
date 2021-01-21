from flask import Blueprint, request

from matiushin_medvedev.controller_utils import convert_to_json

educational_plan_controller = Blueprint('educational_plan_controller', __name__)


@educational_plan_controller.route('/educational_plans/', methods=['POST'])
def create_educational_plan():
    request_body = request.json
    return convert_to_json({
        'id': 1,
        'spec_name': request_body['spec_name'],
        'discipline': request_body['discipline'],
        'hours': request_body['hours'],
        'examination_form': request_body['examination_form']
    }), 201


@educational_plan_controller.route('/educational_plans/', methods=['GET'])
def get_all_educational_plans():
    return convert_to_json([
        {
            'id': 1,
            'spec_name': 'spec_name',
            'discipline': 'discipline',
            'hours': 11,
            'examination_form': 'examination form'
        },
        {
            'id': 2,
            'spec_name': 'spec_name',
            'discipline': 'discipline',
            'hours': 12,
            'examination_form': 'examination form'
        }
    ])


@educational_plan_controller.route('/educational_plans/<educational_plan>', methods=['GET'])
def get_educational_plan(educational_plan):
    return convert_to_json({
        'id': educational_plan,
        'spec_name': 'spec_name',
        'discipline': 'discipline',
        'hours': 1,
        'examination_form': 'examination form'
    })


@educational_plan_controller.route('/educational_plans/<educational_plan>', methods=['PUT'])
def update_educational_plan(educational_plan):
    request_body = request.json
    return convert_to_json({
        'id': educational_plan,
        'spec_name': request_body['spec_name'],
        'discipline': request_body['discipline'],
        'hours': request_body['hours'],
        'examination_form': request_body['examination_form']
    })


@educational_plan_controller.route('/educational_plans/<educational_plan>', methods=['DELETE'])
def delete_educational_plan(educational_plan):
    return '', 204


@educational_plan_controller.route('/educational_plans/<educational_plan>/gradebooks', methods=['GET'])
def get_educational_plan_gradebook_data(educational_plan):
    return convert_to_json({
        'educational_plan': educational_plan,
        'hours': 12,
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
