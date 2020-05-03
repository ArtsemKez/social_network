import React from 'react';
import {Field, reduxForm} from "redux-form";
import { Input } from '../../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit} >
        <div>
            <Field placeholder={"Email"} component={Input} name={'email'} validate={[required]} />
        </div>
        <div>
            <Field placeholder={"Password"} component={Input} name={'password'} validate={[required]} type={'password'} />
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

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMy);
    }

    if(props.isAuth){
        return <Redirect to={"/Profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {login})(Login)