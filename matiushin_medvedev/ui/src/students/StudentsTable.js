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
import {deleteStudent} from '../api/students';
import InputForm from './InputForm';

class UserTable extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            userToDelete: -1,
            userToEdit: -1
        };
    }

    deleteUser = async () => {
        console.log(`Remove user by id ${this.state.userToDelete}`);
        await deleteStudent(this.state.userToDelete);
        this.onCloseModal();
    };

    updateUser = async () => {

    };

    onClickDeleteUser = (id) => {
        this.setState(() => ({userToDelete: id}));
    };

    onCloseModal = () => {
        this.setState(() => ({userToDelete: -1, userToEdit: -1}));
    };

    onClickEditUser = (id) => {
        this.setState(() => ({userToEdit: id}));
    }

    render() {
        console.log('Props are', this.props);
        const userToDelete = this.state.userToDelete;
        const deleteUserModalOpen = userToDelete >= 1;
        const editUserModalOpen = this.state.userToEdit >= 1;
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className={this.props.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Фамилия</TableCell>
                                <TableCell>Имя</TableCell>
                                <TableCell>Отчество</TableCell>
                                <TableCell>Год поступления</TableCell>
                                <TableCell>Форма обучения</TableCell>
                                <TableCell>Группа</TableCell>
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
                                            onClick={() => this.onClickDeleteUser(row.id)}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => this.onClickEditUser(row.id)}
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
                    open={deleteUserModalOpen}
                    onClose={this.onCloseModal}
                    aria-labelledby="delete-user-modal-title"
                    aria-describedby="delete-user-modal-text"
                >
                    <DialogTitle id="delete-user-modal-title">{"Please, confirm the action"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-user-modal-text">
                            This action will permanently remove this user.
                            You will not be able to restore them!
                            Do you really want to remove the user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" autoFocus onClick={this.onCloseModal}>
                            No, close the window
                        </Button>
                        <Button color="primary" onClick={this.deleteUser}>
                            Yes, remove
                        </Button>
                    </DialogActions>
                </Dialog>
                <InputForm
                    open={editUserModalOpen}
                    handleClose={this.onCloseModal}
                    handleSubmit={this.onCloseModal}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loadedStudents: state.students.loaded
});

export const z = connect(mapStateToProps)(UserTable);
