import {setCurriculums} from '../slices/curriculums';
import store from '../slices';
import {loadAllStudents} from './students';

const stubGetAllCurriculums = [
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
]

export const loadAllCurriculums = () => {
    store.dispatch(setCurriculums(stubGetAllCurriculums));
};

export const addCurriculum = async (curriculum) => {
    console.log('Added curriculum');
    // stubGetAllStudents.push(user);
    loadAllStudents();
};

export const updateCurriculum = async (curriculum) => {
    console.log('Updating curriculum', curriculum);
};

export const deleteCurriculum = async (id) => {
    console.log('Removing curriculum' + id);
    loadAllStudents();
}
