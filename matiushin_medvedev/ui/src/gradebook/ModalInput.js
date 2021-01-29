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
import React from "react";
import {withStyles} from "@material-ui/core/styles";

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

    handleClassChange = ({target: {value}}) => {
        this.setState(() => ({
            class: value
        }));
    };

    handleDisciplineChange = ({target: {value}}) => {
        this.setState(() => ({
            discipline: value
        }));
    };

    handleYearChange = ({target: {value}}) => {
        this.setState(() => ({
            year: value
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
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    select
                                    margin="dense"
                                    label="Choose a class"
                                    type="text"
                                    value={this.state.educationForm}
                                    onChange={this.handleClassChange}
                                >
                                    {this.props.groups.map((group) => (
                                        <MenuItem key={group} value={group}>
                                            {group}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    select
                                    margin="dense"
                                    label="Choose a discipline"
                                    type="text"
                                    onChange={this.handleDisciplineChange}
                                >
                                    {this.props.disciplines.map((discipline) => (
                                        <MenuItem key={discipline} value={discipline}>
                                            {discipline}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Year"
                                    type="text"
                                    onChange={this.handleYearChange}
                                    value={this.state.year}
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
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ModalInput);
