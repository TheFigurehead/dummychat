import React from 'react';

import FirebaseGlobal from './../../globals/FirebaseGlobal';
import Rebase from 're-base';

import {Link} from "react-router-dom";

class RoomsList extends React.Component{

    constructor(props){
        super(props);

        this.rebase = Rebase.createClass(FirebaseGlobal.firestore);

        this.state ={
            rooms: []
        }

    }

    UNSAFE_componentWillMount(){
        this.rebase.listenToCollection('rooms', {
            context: this,
            then(data) {
                this.setState({rooms: data})
            },
            withIds: true,
            onFailure(err) {
                this.setState({rooms: ['something went wrong']})
            }
        });
    }

    render(){
        
        return (
            <React.Fragment>
                <h3>Rooms</h3>
                <ul>
                    {this.state.rooms.map(
                        (item,i) => {
                            return (
                                <li key={i}>
                                    <Link to={ '/rooms/' + item.id }>
                                        { item.name }
                                    </Link>
                                </li>
                            );    
                        }
                    )}
                </ul>
            </React.Fragment>
        );
    }

}

export default RoomsList;