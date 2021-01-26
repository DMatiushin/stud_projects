import {setStudents} from '../slices/students';
import store from '../slices';

const stubGetAllStudents = [
    {
        'id': 1,
        'name': "request.name1",
        'surname': "request.surname1",
        'patronymic': "request.patronymic1",
        'entry_date': "request.entry_date1",
        'education_form': "request.education_form1",
        'group_num': "request.group_num1"
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

export const addStudent = async (student) => {
    console.log('Added student');
    // stubGetAllStudents.push(student);
    loadAllStudents();
};

export const updateStudent = async (student) => {
    console.log('Updating student', student);
};

export const deleteStudent = async (id) => {
    console.log('Removing student' + id);
    loadAllStudents();
}
