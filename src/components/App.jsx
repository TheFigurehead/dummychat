import React from 'react';

import FirebaseGlobal from './../globals/FirebaseGlobal';

import Chat from './Chat.jsx';
import Auth from './Auth.jsx';

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

        // if(loggedIn){

            // const userStatusFirestoreRef = FirebaseGlobal.firestore.doc('/users/' + user.uid);
    
            // const isOfflineForFirestore = {
            //     isOnline: false,
            // };
    
            // const isOnlineForFirestore = {
            //     isOnline: true,
            // };

            // console.dir(FirebaseGlobal.firebase.database().ref('.info/connected'));
    
            // FirebaseGlobal.firebase.database().ref('.info/connected').on('value', (snapshot) => {
            //     console.dir(snapshot);
            //     if (snapshot.val() == false) {
            //         // Instead of simply returning, we'll also set Firestore's state
            //         // to 'offline'. This ensures that our Firestore cache is aware
            //         // of the switch to 'offline.'
            //         userStatusFirestoreRef.update(isOfflineForFirestore);
            //         return;
            //     };

            //     console.log(snapshot.val());
                
            //     userStatusFirestoreRef.update(isOnlineForFirestore);

            //     // userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase).then(function() {
            //         // userStatusDatabaseRef.update(isOnlineForDatabase);
    
            //         // We'll also add Firestore set here for when we come online.
            //         // userStatusFirestoreRef.update(isOnlineForFirestore);
            //     // });
            // });

        // }

    }

    render() {

        let component = false;
        
        if(this.state.loggedIn){

            component = <Chat />;

        }else{

            component = <Auth />;
            
        }

        return component;

    }
}

export default App;