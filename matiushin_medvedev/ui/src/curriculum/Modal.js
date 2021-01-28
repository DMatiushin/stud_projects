import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
});

class ModalInputForm extends React.Component {


    constructor(props) {
        super(props);
        let initial = this.props.initial || {};
        this.state = {
            specName: initial.specName || '',
            discipline: initial.discipline || '',
            hours: initial.hours || '',
            examinationForm: initial.examinationForm || ''
        }
    }

    handleSubmit = () => {
        this.props.handleSubmit(this.state);
        this.props.handleClose();
    }

    handleSpecName = (e) => {
        this.setState(() => ({
            specName: e.target.value
        }));
    };

    handleDiscipline = (e) => {
        this.setState(() => ({
            discipline: e.target.value
        }));
    };

    handleHours = (e) => {
        this.setState(() => ({
            hours: e.target.value
        }));
    };

    handleExamForm = (e) => {
        this.setState(() => ({
            examinationForm: e.target.value
        }));
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Curriculum</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <form noValidate autoComplete="off">
                        <div className={this.props.classes.root}>
                            <TextField
                                margin="dense"
                                label="Specialty name"
                                type="text"
                                value={this.state.specName}
                                onChange={this.handleSpecName}
                            />
                            <TextField
                                margin="dense"
                                label="Discipline"
                                type="text"
                                value={this.state.discipline}
                                onChange={this.handleDiscipline}
                            />
                        </div>
                        <div className={this.props.classes.root}>
                            <TextField
                                margin="dense"
                                label="Hours"
                                type="text"
                                value={this.state.hours}
                                onChange={this.handleHours}
                            />
                            <TextField
                                margin="dense"
                                label="Examination form"
                                type="text"
                                value={this.state.examinationForm}
                                onChange={this.handleExamForm}
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
