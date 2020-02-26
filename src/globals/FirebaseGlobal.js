import * as  firebase from 'firebase';
// import ChatUser from './ChatUser';

class FirebaseGlobal{

    constructor(){

        if(! FirebaseGlobal.instance ){
            
            this.firebaseConfig = {
                apiKey: process.env.apiKey,
                authDomain: process.env.authDomain,
                databaseURL: process.env.databaseURL,
                projectId: process.env.projectId,
                storageBucket: process.env.storageBucket,
                messagingSenderId: process.env.messagingSenderId,
                appId: process.env.appId
            };
            
            this.app = firebase.initializeApp(this.firebaseConfig);
            
            this.firebase = firebase;

            this.firestore = firebase.firestore(this.app);

            this.userSignOut = this.userSignOut.bind(this);

            FirebaseGlobal.instance = this;
        }

        return FirebaseGlobal.instance;

    }

    onStatusChange( onChanged ){
        this.firebase.auth().onAuthStateChanged( onChanged );
    }

    onDisconnect( onDisconnect ){
        this.firebase.database().ref().onDisconnect( () => {
            const user = onDisconnect();
            if(user){
                FirebaseGlobal.firestore.collection('users').doc(user.id).update(
                    {
                        inOnline: false
                    }
                );
            }
        } );
    }

    userSignOut(){
        if(this.firebase.auth().currentUser){
            this.firebase.auth().signOut();
            // console.log(this.firebase.functions().onUserStatusChange);
            // ChatUser.disconnectUser();
            var TestTrigger = this.firebase.functions().httpsCallable('TestTrigger');
            TestTrigger({ key: 'test' }).then(function(result) {
                // Read result of the Cloud Function.
                console.log(result)
                // this will log what you have sent from Application TestTrigger 
                // { key: value}
            });
        }
        return false;
    }

}

const instance = new FirebaseGlobal();

export default instance;