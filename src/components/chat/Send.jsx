import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Send = (props) => {

    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage( e.target.value );
    }

    const sendMessage = () => {
        props.onSend( message );
        setMessage('');
    }

    document.addEventListener('keydown', (e) => {
        if(e.keyCode===13 && e.ctrlKey) sendMessage()
    });

    return (
        <Grid
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
                variant="outlined"
            />
            <Button  onClick={sendMessage} variant="contained" color="primary">
                Send
            </Button>
        </Grid>
    );
}

export default Send;