import PeopleIcon from "@material-ui/icons/People";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
import React from "react";

export const menuItems = [
    {id: 'Students', icon: <PeopleIcon/>, path: '/'},
    {id: 'Curriculum', icon: <DnsRoundedIcon/>, path: '/curriculum'},
    {id: 'Gradebook', icon: <PermMediaOutlinedIcon/>, path: '/gradebook'},
];
