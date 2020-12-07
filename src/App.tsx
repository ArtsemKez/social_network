import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter, Router, Redirect, BrowserRouter } from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Setting from "./components/Setting/Setting";
import HeaderContainer from './components/Header/HeaderContainer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './common/Preloader/Preloader';
import { Provider } from 'react-redux';
import store, { AppStateType } from "./redux/redux-store";
import { withSuspense } from './hoc/withSuspense';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const Login = React.lazy(() => import('./components/Login/Login'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedUsers = withSuspense(UsersContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

class App extends Component<MapPropsType & DispatchPropsType> {
    captchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured");
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.captchAllUnhandledErrors);
    }

    componentWillMount() {
        window.removeEventListener("unhandledrejection", this.captchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className="app-wrapper-content">
                    <Route path='/'
                        render={ () => <Redirect to={"/profile"} />} />
                    <Route path='/login'
                        render={withSuspense(Login)} />
                    <Route path='/dialogs'
                        render={() => <SuspendedDialogs/>} />
                    <Route path='/profile/:userId?'
                        render={() => <SuspendedProfile/>} />
                    <Route path='/users'
                        render={() => <SuspendedUsers/> } />
                    <Route path='/music' render={Music} />
                    <Route path='/news' render={News} />
                    <Route path='/setting' render={Setting} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);

let MainApp: React.FC = () => {
    return <BrowserRouter >
        < Provider store={store} >
            <AppContainer />
        </Provider >
    </BrowserRouter >
}

export default MainApp;