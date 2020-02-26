import React from 'react';

import FirebaseGlobal from '../../globals/FirebaseGlobal';
import Rebase from 're-base';
import { withRouter } from "react-router-dom";

import ChatUser from '../../globals/ChatUser';

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
        this.onRemove = this.onRemove.bind(this);
        this.onEdit = this.onEdit.bind(this);

        this.id = props.match.params.id;

        this.styles = {
            wrapper: {
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                flexGrow: 1
            },
            messages: {
                flexWrap: 'nowrap',
                overflowY: 'auto',
                flexGrow: 1,
                paddingBottom: '20px'
            }
        }

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

    onRemove(doc_id){
        return FirebaseGlobal.firestore.collection('rooms/'+this.id+'/messages').doc(doc_id).delete();
    }

    onEdit(doc_id, newText){
        return FirebaseGlobal.firestore.collection('rooms/'+this.id+'/messages').doc(doc_id).update(
            {
                text: newText
            }
        );
    }

    render(){
        return (
            <div style={this.styles.wrapper}>
                <div>Room</div>
                <h3>Messages</h3>
                <div
                    id="messagesList"
                    style={this.styles.messages}
                >
                    <div>
                        {this.state.messages.map(
                            (item,i) => {
                                return (
                                    <Message key={'message-'+i} messageID={item.id} message={item} remove={this.onRemove} edit={this.onEdit} />
                                );    
                            }
                        )}
                    </div>
                </div>
                <Send id="sendMessage" onSend={this.onSend} />
            </div>
        );
    }

}

export default withRouter(Room);