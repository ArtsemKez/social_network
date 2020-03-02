import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import store, { updateNewMessageBodyCreater, sendMessageCreator } from '../../redux/dialogs-reducer';



const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage;
    let dialogsElements = state.dialogs.map ( dialogs => <DialogItem name = {dialogs.name} id= {dialogs.id}/>);
    let messagesElement = state.messages.map ( message => <Message message = {message.message}/>);
    let newMessageBody = state.newMessageBody;
    let onSendMessageClick =()=>{
        store.dispatch(sendMessageCreator())
    };
    let onNewMessageChang =(e)=>{
        let body = e.target.value;
        store.dispatch(updateNewMessageBodyCreater(body));
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems} >
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
                <div>
                    <div><textarea value={newMessageBody} onChange={onNewMessageChang} placeholder = 'Enter your message'></textarea></div>
                    <div><button onClick = {onSendMessageClick}>Send Message</button></div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;