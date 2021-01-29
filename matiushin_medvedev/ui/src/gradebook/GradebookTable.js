import React from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {updateGrade} from "../api/gradebooks";
import {connect} from "react-redux";
import StudentGradeRow from "./StudentGradeRow";

class GradebookTable extends React.Component {

    updateGrade = (studentId, grade) => {
        updateGrade(studentId, this.props.disciplineId, this.props.gradebook.year, grade);
    };

    render() {
        return (
            <TableContainer component={Paper}>
                <Table className={this.props.class}>
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Patronymic</TableCell>
                            <TableCell>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.gradebook.students_marks.map((row) => (
                            <StudentGradeRow
                                key={row.student_id}
                                studentId={row.student_id}
                                grade={row.mark}
                                onChangeGrade={this.updateGrade}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}


export default GradebookTable;//withStyles(styles)(GradebookTable);
