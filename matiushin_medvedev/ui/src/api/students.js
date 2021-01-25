import {setStudents} from '../slices/students';
import store from '../slices';

const stubGetAllStudents = [
    {
        'id': 1,
        'name': "request.name",
        'surname': "request.surname",
        'patronymic': "request.patronymic",
        'entry_date': "request.entry_date",
        'education_form': "request.education_form",
        'group_num': "request.group_num"
    },
    {
        'id': 2,
        'name': "request.name",
        'surname': "request.surname",
        'patronymic': "request.patronymic",
        'entry_date': "request.entry_date",
        'education_form': "request.education_form",
        'group_num': "request.group_num"
    }
];


export const loadAllStudents = () => {
    // fetch('/students')
    //     .then(r => r.json())
    Promise.resolve(stubGetAllStudents)
        .then(students =>
            store.dispatch(setStudents(students))
        );
};

export const deleteStudent = async (id) => {
    console.log('Removing user' + id);
    loadAllStudents();
}
