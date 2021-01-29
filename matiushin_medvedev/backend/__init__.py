import os

from flask import Flask

from matiushin_medvedev.backend.db.db_config import db
from matiushin_medvedev.backend.web.educational_plan_controller import educational_plan_controller
from matiushin_medvedev.backend.web.gradebook_controller import gradebook_controller
from matiushin_medvedev.backend.web.student_controller import student_controller

app = Flask(__name__)
app.register_blueprint(student_controller)
app.register_blueprint(educational_plan_controller)
app.register_blueprint(gradebook_controller)
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://" \
                                        f"{os.getenv('POSTGRESQL_USERNAME')}:{os.getenv('POSTGRESQL_PASSWORD')}@" \
                                        f"{os.getenv('POSTGRESQL_HOST')}:5432/education"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
