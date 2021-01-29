export const getGradebookByDisciplineId = async (id) => {
    return await fetch(`http://localhost:5000/educational_plans/${id}/gradebooks`)
        .then(j => j.json());
};

export const createGradebook = async (studentId, disciplineId, year) => {
    await fetch('http://localhost:5000/gradebooks/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'student_id': studentId,
            'educational_plan_id': disciplineId,
            'year': year,
            'mark': -1
        })
    });
};

export const updateGrade = async (studentId, disciplineId, year, mark) => {
    await fetch('http://localhost:5000/gradebooks/', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'student_id': studentId.toString(),
            'educational_plan_id': disciplineId.toString(),
            'year': year,
            'mark': mark
        })
    });
};
