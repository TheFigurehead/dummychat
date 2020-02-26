import React from 'react';

import FirebaseGlobal from '../../globals/FirebaseGlobal';
import Rebase from 're-base';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';

import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const StyledBadge = withStyles(theme => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
}))(Badge);

class UsersList extends React.Component{
    
    constructor(props){
        super(props);

        this.rebase = Rebase.createClass(FirebaseGlobal.firestore);

        this.props = props;
        this.state = {
            users: []
        }

        this.loadUsers();

    }

    loadUsers(){
        this.rebase.listenToCollection('users', {
            context: this,
            then(data) {
                this.setState({users: data})
            },
            withIds: true,
            onFailure(err) {
                this.setState({users: ['something went wrong']})
            }
        });
    }

    render(){
        
        return (
            <List>
                {this.state.users.map(
                    (item, key) => {

                        let avatar;

                        if(item.isOnline){
                            avatar = (
                                <StyledBadge
                                    overlap="circle"
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                    }}
                                    variant="dot"
                                >
                                    <Avatar src={item.image}>
                                        <ImageIcon />
                                    </Avatar>
                                </StyledBadge>
                            );
                        }else{
                            avatar = (
                                <Avatar src={item.image}>
                                    <ImageIcon />
                                </Avatar>
                            );
                        }
                        return (
                            <React.Fragment key={'users_list_item-'+key}>
                                <ListItem>
                                    <ListItemAvatar>
                                        {avatar}
                                    </ListItemAvatar>
                                    <ListItemText primary={ item.display_name } />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        );
                    }
                )}
            </List>
        );
    }

}

export default UsersList;