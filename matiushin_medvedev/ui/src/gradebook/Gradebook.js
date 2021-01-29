import React from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import GradebookTable from "./GradebookTable";
import {loadAllCurriculums} from "../api/curriculums";
import {connect} from "react-redux";
import ModalInput from "./ModalInput";
import {loadAllStudents} from "../api/students";
import {createGradebook, getGradebookByDisciplineId} from "../api/gradebooks";
import gradebook from "../slices/gradebook";
import Autocomplete from "@material-ui/lab/Autocomplete";


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
    findGradebooks: {
        marginRight: theme.spacing(1),
    },
    add: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    table: {
        minWidth: 650,
    },
});

class Gradebooks extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            modalOpen: false,
            currentGradebook: {},
            currentDisciplineId: -1,
            classInput: '',
            disciplineInput: ''
        };
        loadAllCurriculums();
        loadAllStudents();
    }

    openModal = () => {
        this.setState(() => ({
            modalOpen: true
        }));
    };

    closeModal = () => {
        this.setState(() => ({
            modalOpen: false
        }));
    };

    onSubmitModal = (o) => {
        const discipline = o.discipline;
        const group = o.class;
        const year = o.year;

        const disciplineId = this.props.loadedCurriculums
            .filter(c => c.discipline === discipline)
            .map(c => c.id)[0]

        this.props.loadedStudents
            .filter(s => s.group_num === group)
            .forEach(s => {
                createGradebook(s.id, disciplineId, year);
            });
    };

    handleDisciplineInput = (e, newValue) => {
        this.setState(() => ({
            disciplineInput: newValue
        }));
    };

    handleClassInput = (e, newValue) => {
        this.setState(() => ({
            classInput: newValue
        }));
    };

    doSearch = () => {
        const classInput = this.state.classInput;
        const disciplineInput = this.state.disciplineInput;
        if (!classInput || !disciplineInput) {
            // todo display warning
            alert('class or discipline is not set');
            return;
        }

        let curriculums = this.props.loadedCurriculums;
        // let curriculums = this.props.loadedStudents;

        const matchedCurriculums = curriculums
            .filter(c => c.discipline === disciplineInput);

        // const matchedClasses =
        //     .filter(c => c.discipline === disciplineInput);

        if (matchedCurriculums.length !== 1) {
            return;
        }
        const curriculumId = matchedCurriculums[0].id;
        getGradebookByDisciplineId(curriculumId)
            .then(gradebook => {
                if (gradebook.gradebooks.length) {
                    this.setState(() => ({
                        //todo select year
                        currentGradebook: gradebook.gradebooks[0],
                        currentDisciplineId: curriculumId
                    }));
                }
            });
    };


    render() {
        const {classes} = this.props;
        const availableGroups = Array.from(
            new Set(this.props.loadedStudents.map(s => s.group_num))
        );
        const availableDisciplines = this.props.loadedCurriculums.map(c => c.discipline);
        return (
            <Paper className={classes.paper}>
                <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <SearchIcon className={classes.block} color="inherit"/>
                            </Grid>
                            <Grid item xs>
                                <Autocomplete
                                    options={availableDisciplines}
                                    renderInput={(params) => {
                                        params.InputProps.disableUnderline = true;
                                        return (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                placeholder="Discipline"
                                            />);
                                    }}
                                    onChange={this.handleDisciplineInput}
                                />
                            </Grid>
                            <Grid item xs>
                                <Autocomplete
                                    options={availableGroups}
                                    renderInput={(params) => {
                                        params.InputProps.disableUnderline = true;
                                        return (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                placeholder="Class"
                                            />);
                                    }}
                                    onChange={this.handleClassInput}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.add}
                                    onClick={this.doSearch}
                                >
                                    Search
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.add}
                                    onClick={this.openModal}
                                >
                                    Create gradebook
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                { Boolean(this.state.currentDisciplineId !== -1) &&
                <GradebookTable
                    class={classes.table}
                    gradebook={this.state.currentGradebook}
                    disciplineId={this.state.currentDisciplineId}
                />}
                <ModalInput
                    open={this.state.modalOpen}
                    handleSubmit={this.onSubmitModal}
                    handleClose={this.closeModal}
                    groups={availableGroups}
                    disciplines={availableDisciplines}
                />
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    loadedCurriculums: state.curriculums.loaded,
    loadedStudents: state.students.loaded
});

export default withStyles(styles)(
    connect(mapStateToProps)(Gradebooks)
);
