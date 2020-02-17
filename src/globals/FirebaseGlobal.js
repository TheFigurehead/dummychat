import * as  firebase from 'firebase';

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

    userSignOut(){
        if(this.firebase.auth().currentUser){
            this.firebase.auth().signOut();
        }
        return false;
    }

}

const instance = new FirebaseGlobal();

export default instance;