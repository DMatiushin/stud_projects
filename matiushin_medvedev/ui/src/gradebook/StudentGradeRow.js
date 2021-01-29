import React from "react";
import {FormControl, InputLabel, Select, TableCell, TableRow} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";

class StudentGradeRow extends React.Component {

    constructor(props, context) {
        super(props, context);
        const student = props.loadedStudents
            .filter(s => s.id === props.studentId)[0]
        this.state = {
            grade: props.grade,
            student: student
        };
    }

    onChangeGrade = (e) => {
        this.setState(() => ({
            grade: e.target.value
        }));
        this.props.onChangeGrade(this.props.studentId, e.target.value);
    };

    render() {
        return (
            <TableRow>
                <TableCell component="th" scope="row">
                    {this.state.student.name}
                </TableCell>
                <TableCell>{this.state.student.surname}</TableCell>
                <TableCell>{this.state.student.patronymic}</TableCell>
                <TableCell>
                    <FormControl className={this.props.classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                        <Select
                            native
                            value={this.state.grade}
                            onChange={this.onChangeGrade}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                            }}
                        >
                            <option value={-1}>Not stated</option>
                            <option value={0}>Failed</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Select>
                    </FormControl>
                </TableCell>
            </TableRow>
        );
    }
}


const mapStateToProps = state => ({
    loadedStudents: state.students.loaded
});

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
});

export default connect(mapStateToProps)(
    withStyles(styles)(StudentGradeRow)
);
