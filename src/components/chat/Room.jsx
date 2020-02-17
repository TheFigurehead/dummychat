import React from 'react';

import FirebaseGlobal from '../../globals/FirebaseGlobal';
import Rebase from 're-base';
import { withRouter } from "react-router-dom";

import ChatUser from '../../globals/ChatUser';

import Grid from '@material-ui/core/Grid';

import Send from './Send.jsx';
import Message from './Message.jsx';

class Room extends React.Component{

    constructor(props){
        super(props);

        this.rebase = Rebase.createClass(FirebaseGlobal.firestore);

        this.state ={
            messages: []
        }

        this.onSend = this.onSend.bind(this);

        this.id = props.match.params.id;

    }

    UNSAFE_componentWillMount(){
        this.rebase.listenToCollection('rooms/'+this.id+'/messages', {
            context: this,
            then(data) {
                data.sort(
                    (a, b) => {
                        return a.timestamp - b.timestamp;
                    }
                );
                this.setState({messages: data})
            },
            withIds: true,
            onFailure(err) {
                this.setState({messages: ['something went wrong']})
            }
        });
    }

    onSend(message){
        FirebaseGlobal.firestore.collection('rooms/'+this.id+'/messages').add({
            text: message,
            author_id: ChatUser.user.uid,
            timestamp: Date.now()
        });
    }

    render(){
        
        return (
            <React.Fragment>
                <div>Room</div>
                <h3>Messages</h3>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    {this.state.messages.map(
                        (item,i) => {
                            return (
                                <Message key={'message-'+i} message={item} />
                            );    
                        }
                    )}
                </Grid>
                <Send onSend={this.onSend} />
            </React.Fragment>
        );
    }

}

export default withRouter(Room);