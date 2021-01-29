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
import {deleteCurriculum, updateCurriculum} from '../api/curriculums';
import ModalInputForm from './Modal';
import {examinationForms} from "./common";

class CurriculumTable extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            curriculumToDelete: -1,
            curriculumToEdit: -1
        };
    }

    deleteCurriculum = async () => {
        await deleteCurriculum(this.state.curriculumToDelete);
        this.onCloseModal();
    };

    updateCurriculum = async (curriculum) => {
        curriculum.id = this.state.curriculumToEdit;
        updateCurriculum(curriculum);
    };

    onClickDeleteCurriculum = (id) => {
        this.setState(() => ({curriculumToDelete: id}));
    };

    onCloseModal = () => {
        this.setState(() => ({curriculumToDelete: -1, curriculumToEdit: -1}));
    };

    onClickEditCurriculum = (id) => {
        this.setState(() => ({curriculumToEdit: id}));
    }

    render() {
        const deleteModalOpen = this.state.curriculumToDelete >= 1;
        const editModalOpen = this.state.curriculumToEdit >= 1;

        let curriculumToEdit;
        if (editModalOpen) {
            const selectedCurriculum = this.props.curriculums
                .filter(std => std.id === this.state.curriculumToEdit)[0];
            curriculumToEdit = {
                specName: selectedCurriculum.spec_name,
                discipline: selectedCurriculum.discipline,
                hours: selectedCurriculum.hours,
                examinationForm: selectedCurriculum.examination_form
            }
        } else {
            curriculumToEdit = {};
        }
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className={this.props.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Specialty name</TableCell>
                                <TableCell>Discipline</TableCell>
                                <TableCell>Hours</TableCell>
                                <TableCell>Examination form</TableCell>
                                <TableCell/>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.curriculums.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.spec_name}
                                    </TableCell>
                                    <TableCell>{row.discipline}</TableCell>
                                    <TableCell>{row.hours}</TableCell>
                                    <TableCell>{
                                        examinationForms
                                            .filter(entry => entry.value === row.examination_form)[0]
                                            .label
                                    }</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => this.onClickDeleteCurriculum(row.id)}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => this.onClickEditCurriculum(row.id)}
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
                    open={deleteModalOpen}
                    onClose={this.onCloseModal}
                    aria-labelledby="delete-modal-title"
                    aria-describedby="delete-modal-text"
                >
                    <DialogTitle id="delete-modal-title">
                        Please, confirm the action
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-user-modal-text">
                            This action will permanently remove this curriculum.
                            You will not be able to restore them!
                            Do you really want to remove the curriculum?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" autoFocus onClick={this.onCloseModal}>
                            No, close the window
                        </Button>
                        <Button color="primary" onClick={this.deleteCurriculum}>
                            Yes, remove
                        </Button>
                    </DialogActions>
                </Dialog>
                {Boolean(Object.keys(curriculumToEdit).length) && <ModalInputForm
                    open={editModalOpen}
                    handleClose={this.onCloseModal}
                    handleSubmit={this.updateCurriculum}
                    initial={curriculumToEdit}
                />}
            </div>
        );
    }
}

export default CurriculumTable;
