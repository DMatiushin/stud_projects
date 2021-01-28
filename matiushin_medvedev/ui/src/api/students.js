import {setStudents} from '../slices/students';
import store from '../slices';

export const loadAllStudents = () => {
    fetch('http://localhost:5000/students')
        .then(r => r.json())
        .then(students =>
            store.dispatch(setStudents(students))
        );
};

export const addStudent = async (student) => {
    await fetch('http://localhost:5000/students/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: student.firstName,
            surname: student.secondName,
            patronymic: student.patronymic,
            entry_date: student.entryDate,
            education_form: student.educationForm,
            group_num: student.class
        })
    });
    loadAllStudents();
};

export const updateStudent = async (student) => {
    await fetch(`http://localhost:5000/students/${student.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: student.firstName,
            surname: student.secondName,
            patronymic: student.patronymic,
            entry_date: student.entryDate,
            education_form: student.educationForm,
            group_num: student.class
        })
    });
    loadAllStudents();
};

export const deleteStudent = async (id) => {
    await fetch(`http://localhost:5000/students/${id}`, {
        method: 'DELETE',
    });
    loadAllStudents();
}

export const getStudentsByGroup = async (groupName) => {
    await fetch('http://localhost:5000/students')
        .then(r => r.json())
        .then(students => {
            return students.filter(student => student.group_num.includes(groupName));
        });
};

export const getAvailableGroups = async () => {
    await fetch('http://localhost:5000/students')
        .then(r => r.json())
        .then(students => {
            return Array.from(new Set(students.map(s => s.group_num)));
        });
};
