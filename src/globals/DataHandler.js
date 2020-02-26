import FirebaseGlobal from './FirebaseGlobal';

class DataHandler{

    static userToFormat(user){
        return {
            display_name: user.displayName,
            email: user.email,
            image: user.photoURL,
            uid: user.uid,
            isOnline: Boolean(user.isOnline)
        };
    }

    static setUser(user){

        FirebaseGlobal.firestore.collection('users').doc(user.uid).set(DataHandler.userToFormat(user))
        .then(function() {
            // console.log("Document successfully written!");
        })
        .catch(function(error) {
            // console.error("Error writing document: ", error);
        });

    }

    static getUsers(){
        return DataHandler.recieveCollection( 'users' );
    }

    static getUser(value, field = 'id'){
        
        const user = DataHandler.getUsers().then(
            (users) => {        
                for(let i = 0; i < users.length; i++){
                    if( users[i][field] == value ) return users[i];
                }
            }
        );

        return user;
    }
    
    static async recieveCollection( name ){

        const ref = FirebaseGlobal.firestore.collection(name);
    
        const data = await ref.get().then(Snapshot => {

            return Snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        });

        return data;
        
    }

}

export default DataHandler;