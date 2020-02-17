import React from 'react';
import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { red } from '@material-ui/core/colors';

import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DataHandler from './../../globals/DataHandler';
import ChatUser from './../../globals/ChatUser';

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

const MessageContent = (props) => {

    if(!props.user) return false;

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
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={user.display_name}
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.message.text}
            </Typography>
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
        const messageContent = <MessageContent message={props.message} user={user} />  
        setResponse(messageContent);
    });

  return response;

}

export default Message;