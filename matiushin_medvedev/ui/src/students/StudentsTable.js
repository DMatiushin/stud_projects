import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import {deleteStudent, updateStudent} from '../api/students';
import InputForm from './ModalInputForm';

class StudentTable extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            studentToDelete: -1,
            studentToEdit: -1
        };
    }

    deleteStudent = async () => {
        console.log(`Remove student by id ${this.state.studentToDelete}`);
        await deleteStudent(this.state.studentToDelete);
        this.onCloseModal();
    };

    updateStudent = async (student) => {
        student.id = this.state.studentToEdit;
        updateStudent(student);
    };

    onClickDeleteStudent = (id) => {
        this.setState(() => ({studentToDelete: id}));
    };

    onCloseModal = () => {
        this.setState(() => ({studentToDelete: -1, studentToEdit: -1}));
    };

    onClickEditStudent = (id) => {
        this.setState(() => ({studentToEdit: id}));
    }


    render() {
        const studentToDelete = this.state.studentToDelete;
        const deleteStudentModalOpen = studentToDelete >= 1;
        const editStudentModalOpen = this.state.studentToEdit >= 1;

        let studentToEdit;
        if (editStudentModalOpen) {
            const selectedStudent = this.props.loadedStudents
                .filter(std => std.id === this.state.studentToEdit)[0];
            studentToEdit =  {
                firstName: selectedStudent.name,
                secondName: selectedStudent.surname,
                patronymic: selectedStudent.patronymic,
                entryDate: selectedStudent.entry_date,
                educationForm: selectedStudent.education_form,
                class: selectedStudent.group_num,
            }
        } else {
            studentToEdit = {}
        }
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className={this.props.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Second name</TableCell>
                                <TableCell>First name</TableCell>
                                <TableCell>Patronymic</TableCell>
                                <TableCell>Entry date</TableCell>
                                <TableCell>Education form</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell/>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.loadedStudents.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.surname}
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.patronymic}</TableCell>
                                    <TableCell>{row.entry_date}</TableCell>
                                    <TableCell>{row.group_num}</TableCell>
                                    <TableCell>{row.education_form}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => this.onClickDeleteStudent(row.id)}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => this.onClickEditStudent(row.id)}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog
                    open={deleteStudentModalOpen}
                    onClose={this.onCloseModal}
                    aria-labelledby="delete-student-modal-title"
                    aria-describedby="delete-student-modal-text"
                >
                    <DialogTitle id="delete-student-modal-title">{"Please, confirm the action"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-student-modal-text">
                            This action will permanently remove this student.
                            You will not be able to restore them!
                            Do you really want to remove the student?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" autoFocus onClick={this.onCloseModal}>
                            No, close the window
                        </Button>
                        <Button color="primary" onClick={this.deleteStudent}>
                            Yes, remove
                        </Button>
                    </DialogActions>
                </Dialog>
                { Boolean(Object.keys(studentToEdit).length) && <InputForm
                    open={editStudentModalOpen}
                    handleClose={this.onCloseModal}
                    handleSubmit={this.updateStudent}
                    initial={studentToEdit}
                /> || <div/>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loadedStudents: state.students.loaded
});

export default connect(mapStateToProps)(StudentTable);
