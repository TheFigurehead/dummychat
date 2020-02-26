import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

import FirebaseGlobal from './FirebaseGlobal';

class FirebaseUI{

    constructor(){

        if(! FirebaseUI.instance ){

            this.ui = new firebaseui.auth.AuthUI(FirebaseGlobal.firebase.auth());
            this.init = this.init.bind(this);

            FirebaseUI.instance = this;

        }

        return FirebaseUI.instance;

    }

    init(){
        this.ui.start( '#auth-widget', {
        
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    return false;
              },
            },
            signInSuccessUrl: 'http://localhost:9000',
            signInFlow: 'popup',
            signInOptions: [
              FirebaseGlobal.firebase.auth.EmailAuthProvider.PROVIDER_ID,
              FirebaseGlobal.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            privacyPolicyUrl: function() {
              window.location.assign('http://localhost:9000');
            }
        });
        
        this.ui.disableAutoSignIn();
    }

}

const instance = new FirebaseUI();

export default instance;