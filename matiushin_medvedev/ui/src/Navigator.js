import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import {BrowserRouter, useHistory, useLocation} from 'react-router-dom';


const menuItems = [
    {id: 'Students', icon: <PeopleIcon/>, path: '/'},
    {id: 'Database', icon: <DnsRoundedIcon/>, path: '/url1'},
    {id: 'Storage', icon: <PermMediaOutlinedIcon/>, path: '/url2'},
];

const styles = (theme) => ({
    categoryHeader: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
    item: {
        paddingTop: 1,
        paddingBottom: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover,&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    firebase: {
        fontSize: 24,
        color: theme.palette.common.white,
    },
    itemActiveItem: {
        color: '#4fc3f7',
    },
    itemPrimary: {
        fontSize: 'inherit',
    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(2),
    },
});

function Navigator(props) {
    const {classes, ...other} = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                    Paperbase
                </ListItem>
                <BrowserRouter>
                    <React.Fragment>
                        {menuItems.map(({id: menuId, icon, active, path}) => (
                            <Item
                                classes={classes}
                                icon={icon}
                                menuId={menuId}
                                path={path}
                                key={menuId}
                            />
                        ))}
                    </React.Fragment>
                </BrowserRouter>
            </List>
        </Drawer>
    );
}

function Item(props) {
    let history = useHistory();
    const location = useLocation();
    const pathname = location.pathname;
    const active = pathname === props.path;

    function handleClick(path) {
        history.push(path);
    }

    return (
        <ListItem
            button
            className={clsx(props.classes.item, active && props.classes.itemActiveItem)}
            onClick={() => handleClick(props.path)}
        >
            <ListItemIcon
                className={props.classes.itemIcon}>
                {props.icon}
            </ListItemIcon>
            <ListItemText
                classes={{
                    primary: props.classes.itemPrimary,
                }}
            >
                {props.menuId}
            </ListItemText>
        </ListItem>
    );
}


Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
