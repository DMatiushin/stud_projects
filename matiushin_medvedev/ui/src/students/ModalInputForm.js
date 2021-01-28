import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 150,
        },
    },
});

class ModalInputForm extends React.Component {


    constructor(props) {
        super(props);
        let initial = this.props.initial || {};
        console.log('Initial', initial);
        this.state = {
            firstName: initial.firstName || '',
            secondName: initial.secondName || '',
            patronymic: initial.patronymic || '',
            entryDate: initial.entryDate || '',
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
        console.log('Props', this.props);
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
                        <div className={this.props.classes.root}>
                            <TextField
                                margin="dense"
                                label="First name"
                                type="text"
                                value={this.state.firstName}
                                onChange={this.handleFirstName}
                            />
                            <TextField
                                margin="dense"
                                label="Second name"
                                type="text"
                                value={this.state.secondName}
                                onChange={this.handleSecondName}
                            />
                            <TextField
                                margin="dense"
                                label="Patronymic"
                                type="text"
                                value={this.state.patronymic}
                                onChange={this.handlePatronymic}
                            />
                        </div>
                        <div className={this.props.classes.root}>
                            <TextField
                                margin="dense"
                                label="Entry date"
                                type="text"
                                value={this.state.entryDate}
                                onChange={this.handleEntryDate}
                            />
                            <TextField
                                margin="dense"
                                label="Education form"
                                type="text"
                                value={this.state.educationForm}
                                onChange={this.handleEducationForm}
                            />
                            <TextField
                                margin="dense"
                                label="Class"
                                type="text"
                                value={this.state.class}
                                onChange={this.handleClass}
                            />
                        </div>
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

export default withStyles(styles)(ModalInputForm);
