from flask import Flask

from matiushin_medvedev.student_controller import student_controller

app = Flask(__name__)
app.register_blueprint(student_controller)

