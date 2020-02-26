import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

const Send = (props) => {

    const styles = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#fff'
    }

    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage( e.target.value );
    }

    const onKeyPress = (e) => {
        if(window.event.code==='Enter' && e.ctrlKey){
            sendMessage();
        }
    }

    useEffect(()=>{
        document.getElementById('messagesList').style.marginBottom = document.getElementById('sendMessage').clientHeight + 'px';
    }, []);

    const sendMessage = () => {
        props.onSend( message );
        setMessage('');
    }

    return (
        <Grid
            id={props.id}
            style={styles}
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
        >
            <TextField
                id="chat-message"
                label="Type your message"
                multiline
                rows="4"
                value={message}
                onChange={onChange} 
                onKeyPress={onKeyPress}
                variant="outlined"
            />
            <Button onClick={sendMessage} variant="contained" color="primary" endIcon={<SendIcon />}>
                Send
            </Button>
        </Grid>
    );
}

export default Send;