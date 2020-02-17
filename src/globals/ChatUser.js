import FirebaseGlobal from './FirebaseGlobal';
import DataHandler from './DataHandler';

class ChatUser{

    constructor(){

        if(!ChatUser.instance){

            this.checkUser = this.checkUser.bind(this);
            FirebaseGlobal.onStatusChange(this.checkUser);

            this.user = false;

            ChatUser.instance = this;

        }

        return ChatUser.instance;            

    }

    checkUser(user){
        if(!user) return false;
        this.user = DataHandler.userToFormat(user);
        DataHandler.getUsers().then(data => {
            let result = data.filter( (item ) => {
                if(item.id === user.uid) {
                    return true;
                }

            } );
            if( ! result.length ){
                DataHandler.setUser(user);
                this.user = DataHandler.userToFormat(user);
            }
        });
    }

}

const instance = new ChatUser();

export default instance;