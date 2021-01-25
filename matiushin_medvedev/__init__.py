from flask import Flask

from matiushin_medvedev.educational_plan_controller import educational_plan_controller
from matiushin_medvedev.gradebook_controller import gradebook_controller
from matiushin_medvedev.student_controller import student_controller

app = Flask(__name__)
app.register_blueprint(student_controller)
app.register_blueprint(educational_plan_controller)
app.register_blueprint(gradebook_controller)


if __name__ == 'main':
    app.run()
