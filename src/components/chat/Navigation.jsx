import React from 'react';
import { Link } from "react-router-dom";

import FirebaseGlobal from './../../globals/FirebaseGlobal';

/* material deps */

import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const Navigation = (props) => {

    const mobileOpen = props.mobileOpen;
    const handleDrawerToggle = handleDrawerToggle;

    const classes = useStyles();
    const theme = useTheme();

    const MainList = [
        {
            to: '/',
            label: 'Home',
            icon: <InboxIcon />
        },
        {
            to: '/rooms',
            label: 'Rooms',
            icon: <InboxIcon />
        },
        {
            to: '/',
            label: 'Log out',
            icon: <InboxIcon />,
            handler: FirebaseGlobal.userSignOut
        }
    ];
  
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {MainList.map((item, index) => (
            <Link onClick={ ( item.handler ) ? item.handler : () => { return false; } } key={'nav'+index} to={item.to}>
                <ListItem button key={'list-'+index}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                </ListItem>
            </Link>
          ))}
        </List>
        <Divider />

      </div>
    );

    return( 
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
            <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper,
                }}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
            <Drawer
                classes={{
                paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>
            </Hidden>
        </nav>
    );

}

export default Navigation;