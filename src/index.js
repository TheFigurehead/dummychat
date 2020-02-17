import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';

ReactDOM.render(<App />, document.getElementById('app'));

// const firebaseui = require('firebaseui');
// const ui = new firebaseui.auth.AuthUI(FirebaseGlobal.firebase.auth())

// ui.start('#auth-widget', {
//     signInOptions: [
//         firebase.auth.EmailAuthProvider.PROVIDER_ID
//     ]
// });