import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import CurriculumTable from './CurriculusTable';
import ModalInputForm from './Modal';
import {addCurriculum, loadAllCurriculums} from '../api/curriculums';
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";


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
            curriculumAddModalOpen: false,
            filteredCurriculums: props.loadedCurriculums
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

    onSearchChange = ({target: {value}}) => {
        const filtered = value
            ? this.props.loadedCurriculums.filter(s => s.spec_name.includes(value) || s.discipline.includes(value))
            : this.props.loadedCurriculums

        this.setState(() => ({
            filteredCurriculums: filtered
        }));
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
                                    placeholder="Search"
                                    InputProps={{
                                        disableUnderline: true,
                                        className: classes.searchInput,
                                    }}
                                    onChange={this.onSearchChange}
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
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                {Boolean(this.state.filteredCurriculums.length) &&
                <CurriculumTable
                    class={classes.table}
                    curriculums={this.state.filteredCurriculums}
                />
                }
                {!Boolean(this.state.filteredCurriculums.length) &&
                <div className={classes.contentWrapper}>
                    <Typography color="textSecondary" align="center">
                        No curriculums found
                    </Typography>
                </div>
                }
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

const mapStateToProps = state => ({
    loadedCurriculums: state.curriculums.loaded
});

export default withStyles(styles)(
    connect(mapStateToProps)(Curriculums)
);
