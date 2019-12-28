import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';



const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map ( dialogs => <DialogItem name = {dialogs.name} id= {dialogs.id}/>);
    let messagesElement = props.state.messages.map ( message => <Message message = {message.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems} >
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElement}
            </div>
        </div>
    )
}

export default Dialogs;