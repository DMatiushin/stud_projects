export const getGradebookByDisciplineId = async (id) => {
    return await fetch(`http://localhost:5000/educational_plans/${id}/gradebooks`)
        .then(j => j.json())
        .then(r => r.gradebooks);
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

export const setMark = async (id, studentId, disciplineId, year, mark) => {
    await fetch(`http://localhost:5000/gradebooks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'student_id': studentId,
            'educational_plan_id': disciplineId,
            'year': year,
            'mark': mark
        })
    });
};
