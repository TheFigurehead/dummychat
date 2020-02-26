import React from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { red } from '@material-ui/core/colors';

import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DataHandler from './../../globals/DataHandler';

import ChatUser from '../../globals/ChatUser';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatarImg: {
    height: '100%',
  },

}));

const getUser = async (props) => {

    const user = DataHandler.getUser(props.message.author_id).then((result) => {return result;});

    return await user;
}

const timeConverter = (UNIX_timestamp) => {
  const a = new Date(UNIX_timestamp * 1000);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

const MessageContent = (props) => {

    if(!props.user) return false;

    console.dir(props.user);

    const [mode, setMode] = useState('show');
    const [editText, setEditText] = useState(props.message.text);

    const onTextChange = (e) => {
      setEditText(e.target.value);
    }

    const remove = (id) => {
      props.remove(id).then(
          ()=>{
              console.log('remove');
          }
      ).catch((error)=>{
          console.error("Error removing document: ", error);
      })
    }

    const classes = useStyles();

    const user = props.user;

    let avatar_display = user.display_name.charAt(0);

    if(!user.display_name.image){
        avatar_display = <img className={classes.avatarImg} src={user.image} />
    }
    const avatar = (
        <Avatar aria-label="recipe" className={classes.avatar}>
            {avatar_display}
        </Avatar>
    );

    return (
        <Card className={classes.root}>
          <CardHeader
            avatar={avatar}
            action={
              <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                  <React.Fragment>
                    {(()=>{
                      if(ChatUser.user.uid == props.message.author_id){
                        return (
                          <React.Fragment>
                            <IconButton aria-label="settings" {...bindTrigger(popupState)}>
                              <MoreVertIcon />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem onClick={()=>{
                                popupState.close();
                                setMode('edit');
                              }}>Edit</MenuItem>
                              <MenuItem onClick={()=>{
                                popupState.close()
                                remove(props.message.id);
                              }}>Remove</MenuItem>
                            </Menu>
                          </React.Fragment>
                        );
                      }
                    })()}
                  </React.Fragment>
                )}
              </PopupState>
            }
            title={user.display_name}
            subheader={timeConverter(props.message.timestamp)}
          />
          <CardContent>
            {(() => {
              switch (mode) {
                case "show": return (
                  <Typography variant="body2" color="textSecondary" component="p">
                    {props.message.text}
                  </Typography>
                )
                case "return":
                default: 
                  return (
                    <React.Fragment>
                      <TextField
                        multiline
                        rows="4"
                        variant="outlined"
                        value={editText}
                        onChange={onTextChange}
                      />
                      <button onClick={
                        ()=>{
                          props.edit(props.message.id, editText).then(()=>{
                            setMode('show');
                          });
                        }
                      }>Save</button>
                    </React.Fragment>
                  );
              }
            })()}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
      );
}

const Message = (props) => {

  const [response, setResponse] = useState(<div></div>);

  getUser(props).then((user) => {
      const messageContent = <MessageContent message={props.message} remove={props.remove} edit={props.edit} user={user} />  
      setResponse(messageContent);
  });

  return response;

}

export default Message;