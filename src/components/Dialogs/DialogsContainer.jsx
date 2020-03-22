import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import store from "../../redux/redux-store";
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {
    let state = props.store.getState().dialogsPage;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator());
    }

    let onNewMessageChange = (body) => {
        props.store.dispatch(props.updateNewMessageBodyCreator(body));
    }

    return (<Dialogs updateNewMessageBody={onNewMessageChange}
        sendMessage={onSendMessageClick}
        dialogsPage={state}  />)
}

export default DialogsContainer;