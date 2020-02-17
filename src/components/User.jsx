import React from 'react';

class User extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        return ( 
            <div>
                <h3>{this.props.user.display_name}</h3>
                <h4>Email: {this.props.user.email}</h4>
                <img src={this.props.user.image} alt=""/>
            </div>
        );
    }

}

export default User;