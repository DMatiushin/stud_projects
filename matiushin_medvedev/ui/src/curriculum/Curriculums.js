import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import AppBar from "@material-ui/core/AppBar";
import {z as UserTable} from './CurriculusTable';
import ModalInputForm from './Modal';
import {addCurriculum, loadAllCurriculums} from '../api/curriculums';


const styles = (theme) => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addCurriculum: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    table: {
        minWidth: 650,
    },
});

class Curriculums extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            curriculumAddModalOpen: false
        };
        loadAllCurriculums();
    }

    onAddCurriculumOpen = () => {
        this.setState(() => ({
            curriculumAddModalOpen: true
        }));
    };

    onAddCurriculumClose = () => {
        this.setState(() => ({
            curriculumAddModalOpen: false
        }));
    };

    addCurriculum = (user) => {
        addCurriculum(user);
    };

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.paper}>
                <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <SearchIcon className={classes.block} color="inherit"/>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    placeholder="Search by name"
                                    InputProps={{
                                        disableUnderline: true,
                                        className: classes.searchInput,
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.addCurriculum}
                                    onClick={this.onAddCurriculumOpen}
                                >
                                    Add curriculum
                                </Button>
                                <Tooltip title="Reload">
                                    <IconButton>
                                        <RefreshIcon className={classes.block} color="inherit"/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <UserTable class={classes.table}/>
                <ModalInputForm
                    open={this.state.curriculumAddModalOpen}
                    handleClose={this.onAddCurriculumClose}
                    handleSubmit={this.addCurriculum}
                />
            </Paper>
        );
    }

}

Curriculums.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Curriculums);
