import React, { useEffect } from 'react';

const styles = {
    flexGrow: '1',
    overflowY: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
};

const RoomWrapper = (props) => {

    useEffect(() => {
        setTimeout(()=>{
            var element = document.getElementById('messagesList');
            var newScrollTop = element.scrollHeight - element.clientHeight;
            
            let interval = setInterval(
                ()=>{
                    if((element.scrollTop + 100) >= newScrollTop){
                        element.scrollTop = newScrollTop;
                        removeInterval();
                        return;
                    }
                    element.scrollTop += 100;
                },
                10
            );

            let removeInterval = () => {
                clearInterval(interval);
            }
        }, 1000);
    });

    return (
        <div className="roomwrapper" style={styles}>
            {props.children}
        </div>
    );
}

export default RoomWrapper;