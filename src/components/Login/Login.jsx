import React from 'react';
import {Field, reduxForm} from "redux-form";

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
            <Field placeholder={"login"} component={'input'} name={'login'} />
        </div>
        <div>
            <Field placeholder={"Password"} component={'input'} name={'password'} />
        </div>
        <div>
            <Field type={"checkbox"} component={'input'} name={'rememberMy'} /> Remember my
            </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm ({form: 'login'})(LoginForm)


export default Login;