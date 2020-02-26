import React from 'react';

import ChatUser from './../../globals/ChatUser';

class User extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        const user = (this.props.user) ? this.props.user : ChatUser.user;
        return ( 
            <div>
                <h3>{user.display_name}</h3>
                <h4>Email: {user.email}</h4>
                <img src={user.image} alt=""/>
            </div>
        );
    }

}

export default User;