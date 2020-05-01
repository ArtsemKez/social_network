import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator } from "../../redux/dialogs-reducer";
import store from "../../redux/redux-store";
import { Redirect } from 'react-router-dom';
import {Field, reduxForm} from "redux-form";



const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
    let newMessageBody = state.newMessageBody;

    const addNewMessage = (value) => {
        props.sendMessage(value.newMessageBody);
    } 

    if (!props.isAuth) { return <Redirect to={"/login"} /> }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <MessagesReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}



const AddMessageFormRedux = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} placeholder={"Enter your message"} name={'newMessageBody'} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const MessagesReduxForm = reduxForm ({form: 'dialogAddMessageFormRedux'})(AddMessageFormRedux)

export default Dialogs;