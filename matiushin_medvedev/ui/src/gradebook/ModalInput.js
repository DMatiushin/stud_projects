import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 150,
        },
    },
});

class ModalInput extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            class: '',
            discipline: '',
            year: new Date().getFullYear()
        };
    }

    handleSubmit = () => {
        this.props.handleSubmit({
            class: this.state.class,
            discipline: this.state.discipline,
            year: this.state.year
        });
        this.props.handleClose();
    };

    handleClassChange = (event, newValue) => {
        this.setState(() => ({
            class: newValue
        }));
    };

    handleDisciplineChange = (event, newValue) => {
        this.setState(() => ({
            discipline: newValue
        }));
    };

    handleYearChange = (event, newValue) => {
        this.setState(() => ({
            year: newValue
        }));
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Create a gradebook</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please, enter class and discipline names.
                    </DialogContentText>
                    <form noValidate autoComplete="off">
                        <div className={this.props.classes.root}>
                            <Autocomplete
                                options={this.props.groups}
                                renderInput={(params) => (
                                    <TextField {...params} label="Choose a class" margin="normal" variant="outlined"/>
                                )}
                                onChange={this.handleClassChange}
                            />
                            <Autocomplete
                                options={this.props.disciplines}
                                renderInput={(params) => (
                                    <TextField {...params} label="Choose a discipline" margin="normal"
                                               variant="outlined"/>
                                )}
                                onChange={this.handleDisciplineChange}
                            />
                            <TextField
                                margin="dense"
                                label="Year"
                                type="text"
                                onChange={this.handleYearChange}
                                value={this.state.year}
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ModalInput);
