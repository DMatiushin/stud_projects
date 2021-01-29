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
import {withStyles} from "@material-ui/core/styles";
import {examinationForms} from "./common";

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
        console.log('This state', this.state);
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Curriculum</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please, enter curriculum
                    </DialogContentText>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Specialty name"
                                    type="text"
                                    value={this.state.specName}
                                    onChange={this.handleSpecName}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Discipline"
                                    type="text"
                                    value={this.state.discipline}
                                    onChange={this.handleDiscipline}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Hours"
                                    type="text"
                                    value={this.state.hours}
                                    onChange={this.handleHours}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    select
                                    margin="dense"
                                    label="Specialty name"
                                    type="text"
                                    value={this.state.examinationForm}
                                    onChange={this.handleExamForm}
                                >
                                    {examinationForms.map((form) => (
                                        <MenuItem key={form.value} value={form.value}>
                                            {form.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

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

export default withStyles(styles)(ModalInputForm);
