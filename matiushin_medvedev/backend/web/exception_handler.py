from json.decoder import JSONDecodeError

from flask import Blueprint
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError, DataError
from werkzeug.exceptions import NotFound

from matiushin_medvedev.backend.web.controller_utils import response_to_json

error_handler = Blueprint('error_handler', __name__)


@error_handler.app_errorhandler(IntegrityError)
def handle_integrity_exception(e):
    if e.orig and e.orig.diag:
        message = e.orig.diag.message_detail
    else:
        message = str(e)
    return response_to_json([{"message": message}]), 400


@error_handler.app_errorhandler(JSONDecodeError)
def handle_decode_exception(e):
    return response_to_json([{"message": e.args[0]}]), 400


@error_handler.app_errorhandler(DataError)
def handle_data_exception(e):
    if e.orig and e.orig.diag:
        message = e.orig.diag.message_primary
    else:
        message = str(e)
    return response_to_json([{"message": message}]), 400


@error_handler.app_errorhandler(ValidationError)
def handle_data_exception(e):
    response = [{"field": key,
                 "message": ','.join(value)
                 } for key, value in e.messages.items()]
    return response_to_json(response), 400


@error_handler.app_errorhandler(NotFound)
def handle_not_found(e):
    return response_to_json([{"message": "Not found"}]), 404


@error_handler.app_errorhandler(Exception)
def handle_unexpected_exception(e):
    print(e)
    return response_to_json([{"message": "Unexpected error"}]), 500
