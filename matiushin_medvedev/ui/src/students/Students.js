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
import StudentTable from './StudentsTable';
import InputForm from './ModalInputForm';
import {addStudent, countByEducationalForm, loadAllStudents} from '../api/students';
import Autocomplete from "@material-ui/lab/Autocomplete";
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
    btn: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    table: {
        minWidth: 650,
    },
});

class Students extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            studentAddModalOpen: false,
            classSearchString: '',
            filteredStudents: [],
            fullTimeCount: 0,
            partTimeCount: 0,
            eveningCount: 0,
        };
        loadAllStudents();
        this.loadEducationFormCounts();
    }

    onAddStudentOpen = () => {
        this.setState(() => ({
            studentAddModalOpen: true
        }));
    };

    onAddStudentClose = () => {
        this.setState(() => ({
            studentAddModalOpen: false
        }));
    };

    addStudent = (student) => {
        addStudent(student);
    };

    onChangeSearchInput = (e, newValue) => {
        this.setState(() => ({
            classSearchString: newValue
        }));
    }

    doSearch = () => {
        const classToFilter = this.state.classSearchString;
        this.setState(() => ({
            filteredStudents: this.props.availableStudents.filter(s => s.group_num === classToFilter)
        }));
    };

    loadEducationFormCounts = () => {
        countByEducationalForm('FULL_TIME')
            .then(r => this.setState(() => ({
                fullTimeCount: r.students_total
            })));
        countByEducationalForm('PART_TIME')
            .then(r => this.setState(() => ({
                partTimeCount: r.students_total
            })));
        countByEducationalForm('EVENING')
            .then(r => this.setState(() => ({
                eveningCount: r.students_total
            })));
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
                                <Autocomplete
                                    options={this.props.availableClasses || []}
                                    renderInput={(params) => {
                                        params.InputProps.disableUnderline = true;
                                        return (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                placeholder="Class"
                                            />);
                                    }}
                                    onChange={this.onChangeSearchInput}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.doSearch}
                                    className={classes.btn}
                                >
                                    Find
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.btn}
                                    onClick={this.onAddStudentOpen}
                                >
                                    Add student
                                </Button>

                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {Boolean(this.state.filteredStudents.length) && <StudentTable
                    class={classes.table}
                    filteredStudents={this.state.filteredStudents}
                    fullTimeCount={this.state.fullTimeCount}
                    partTimeCount={this.state.partTimeCount}
                    eveningCount={this.state.eveningCount}
                />}
                {!Boolean(this.state.filteredStudents.length) &&
                <div className={classes.contentWrapper}>
                    <Typography color="textSecondary" align="center">
                        No users found
                    </Typography>
                </div>
                }
                <InputForm
                    open={this.state.studentAddModalOpen}
                    handleClose={this.onAddStudentClose}
                    handleSubmit={this.addStudent}
                />
            </Paper>
        );
    }

}

Students.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    availableClasses: state.students.availableClasses,
    availableStudents: state.students.loaded
});


export default withStyles(styles)(
    connect(mapStateToProps)(Students)
);
