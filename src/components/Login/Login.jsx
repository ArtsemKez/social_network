import React from 'react';
import {Field, reduxForm} from "redux-form";
import { Input, createField } from '../../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from "../../common/FormsControls/FormsControls.module.css";

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit} >
            {createField("Email", Input, 'email', [required])}
            {createField("Password", Input, 'password', [required], 'password')}
            {createField(null, Input, 'rememberMy', null, "checkbox", "Remember Me")}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image", Input, 'captcha', [required])}
        <div>
            <button>Login</button>
        </div>
        {error && <div className={style.formSammaryError}>
            {error}
        </div>}
    </form>
}

const LoginReduxForm = reduxForm ({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMy, formData.captcha);
    }

    if(props.isAuth){
        return <Redirect to={"/Profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect (mapStateToProps, {login})(Login)