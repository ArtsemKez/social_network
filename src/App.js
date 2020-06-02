import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter } from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Setting from "./components/Setting/Setting";
import HeaderContainer from './components/Header/HeaderContainer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './common/Preloader/Preloader';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./redux/redux-store";
import { withSuspense } from './hoc/withSuspense';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const Login = React.lazy(() => import('./components/Login/Login'))




class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
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
                    <Route path='/login'
                        render={withSuspense(Login)} />
                    <Route path='/dialogs'
                        render={withSuspense(DialogsContainer)} />
                    <Route path='/profile/:userId?'
                        render={withSuspense(ProfileContainer)} />
                    <Route path='/users'
                        render={withSuspense(UsersContainer)} />
                    <Route path='/music' render={Music} />
                    <Route path='/news' render={News} />
                    <Route path='/setting' render={Setting} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);

let MainApp = (props) => {
    return <HashRouter >
        < Provider store={store} >
            <AppContainer />
        </Provider >
    </HashRouter >
}

export default MainApp;