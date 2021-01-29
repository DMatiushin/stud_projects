import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {educationalForms} from "./common";

class ModalInputForm extends React.Component {

    constructor(props) {
        super(props);
        let initial = this.props.initial || {};
        console.log('Initial', initial);
        this.state = {
            firstName: initial.firstName || '',
            secondName: initial.secondName || '',
            patronymic: initial.patronymic || '',
            entryDate: initial.entryDate ? initial.entryDate.slice(0, 10) : '',
            educationForm: initial.educationForm || '',
            class: initial.class || ''
        }
    }

    handleSubmit = () => {
        this.props.handleSubmit(this.state);
        this.props.handleClose();
    }

    handleFirstName = (e) => {
        this.setState(() => ({
            firstName: e.target.value
        }));
    };

    handleSecondName = (e) => {
        this.setState(() => ({
            secondName: e.target.value
        }));
    };

    handlePatronymic = (e) => {
        this.setState(() => ({
            patronymic: e.target.value
        }));
    };

    handleEntryDate = (e) => {
        this.setState(() => ({
            entryDate: e.target.value
        }));
    };

    handleEducationForm = (e) => {
        this.setState(() => ({
            educationForm: e.target.value
        }));
    };

    handleClass = (e) => {
        this.setState(() => ({
            class: e.target.value
        }));
    };

    render() {
        console.log('Modal input form state', this.state);
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Student</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="First name"
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={this.handleFirstName}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Second name"
                                    type="text"
                                    value={this.state.secondName}
                                    onChange={this.handleSecondName}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Patronymic"
                                    type="text"
                                    value={this.state.patronymic}
                                    onChange={this.handlePatronymic}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Entry date"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    value={this.state.entryDate}
                                    onChange={this.handleEntryDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    select
                                    margin="dense"
                                    label="Educational form"
                                    type="text"
                                    value={this.state.educationForm}
                                    onChange={this.handleEducationForm}
                                >
                                    {educationalForms.map((entry) => (
                                        <MenuItem key={entry.value} value={entry.value}>
                                            {entry.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Class"
                                    type="text"
                                    value={this.state.class}
                                    onChange={this.handleClass}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ModalInputForm;
