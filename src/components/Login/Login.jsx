import React from 'react';
import {Field, reduxForm} from "redux-form";
import { Input } from '../../common/FormsControls/FormsControls';
import { requaired } from '../../utils/validators/validators';

const Login = (props) => {
    const onSubmit = (FormData) => {
        console.log(FormData);
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit} >
        <div>
            <Field placeholder={"login"} component={Input} name={'login'} validate={[requaired]} />
        </div>
        <div>
            <Field placeholder={"Password"} component={Input} name={'password'} validate={[requaired]} />
        </div>
        <div>
            <Field component={Input} name={'rememberMy'} type={"checkbox"} /> Remember my
            </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm ({form: 'login'})(LoginForm)


export default Login;