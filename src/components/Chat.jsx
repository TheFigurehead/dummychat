import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import RoomWrapper from './chat/RoomWrapper.jsx';
import Room from './chat/Room.jsx';
import RoomsList from './chat/RoomsList.jsx';
import Navigation from './chat/Navigation.jsx';

import User from './widgets/User.jsx';
import WidgetsHolder from './widgets/WidgetsHolder.jsx';
import UsersList from './widgets/UsersList.jsx';

/* material deps */

import IconButton from '@material-ui/core/IconButton';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100%',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
}));

const Chat = (props) => {

    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <Navigation mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Responsive drawer
                    </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/">
                            Chat
                        </Route>
                        <Route exact path="/rooms">
                            <RoomsList />
                        </Route>
                        <Route path="/rooms/:id" component={RoomWrapper}>
                            <RoomWrapper>
                              <Room />
                              <WidgetsHolder>
                                <User />
                                <UsersList />
                              </WidgetsHolder>
                            </RoomWrapper>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );

}

export default Chat;