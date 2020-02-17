import React from 'react';

import FirebaseGlobal from './../globals/FirebaseGlobal';
import ChatUser from './../globals/ChatUser';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Chat from './Chat.jsx';
import Auth from './Auth.jsx';
import User from './User.jsx';

class App extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            loggedIn: false
        };

        this.onChanged = this.onChanged.bind(this);
        FirebaseGlobal.onStatusChange(this.onChanged);

    }

    onChanged(user){

        let loggedIn = (user) ? true : false;

        this.setState(
            {
                loggedIn: loggedIn
            }
        );

    }

    render() {

        let component = false;
        
        if(this.state.loggedIn){

            // component = (
            //     <Grid 
            //         container
            //         direction="row"
            //         justify="flex-start"
            //         alignItems="stretch"
            //         spacing={3}
            //     >
            //         <Grid item lg>
            //             <Paper>
            //                 <Chat />
            //             </Paper>
            //         </Grid>
            //         <Grid item>
            //             <Paper>
            //                 <User user={ChatUser.user} />
            //             </Paper>
            //         </Grid>
            //     </Grid>
            // );
            component = <Chat />;

        }else{

            component = <Auth />;
            
        }

        return component;

    }
}

export default App;