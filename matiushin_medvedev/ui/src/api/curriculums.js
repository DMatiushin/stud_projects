import {setCurriculums} from '../slices/curriculums';
import store from '../slices';

export const loadAllCurriculums = () => {
    fetch('http://localhost:5000/educational_plans')
        .then(r => r.json())
        .then(body => {
            store.dispatch(setCurriculums(body));
        });
};

export const addCurriculum = async (curriculum) => {
    await fetch('http://localhost:5000/educational_plans/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            spec_name: curriculum.specName,
            discipline: curriculum.discipline,
            hours: curriculum.hours,
            examination_form: curriculum.examinationForm,
        })
    });
    loadAllCurriculums();
};

export const updateCurriculum = async (curriculum) => {
    await fetch(`http://localhost:5000/educational_plans/${curriculum.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            spec_name: curriculum.specName,
            discipline: curriculum.discipline,
            hours: curriculum.hours,
            examination_form: curriculum.examinationForm,
        })
    });
    loadAllCurriculums();
};

export const deleteCurriculum = async (id) => {
    await fetch(`http://localhost:5000/educational_plans/${id}`, {
        method: 'DELETE',
    });
    loadAllCurriculums();
}
