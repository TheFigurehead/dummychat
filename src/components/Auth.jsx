import React from 'react';

import FirebaseUI from './../globals/FirebaseUI';

class Auth extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount() {
        FirebaseUI.init();
    }

    render(){
        return <div id="auth-widget"></div>;
    }

}

export default Auth;