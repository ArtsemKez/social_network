import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter } from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Setting from "./components/Setting/Setting";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './common/Preloader/Preloader';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./redux/redux-store";



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
                    <Route path='/dialogs'
                        render={() => <DialogsContainer />} />
                    <Route path='/profile/:userId?'
                        render={() => <ProfileContainer />} />
                    <Route path='/users'
                        render={() => <UsersContainer />} />
                    <Route path='/music' render={Music} />
                    <Route path='/news' render={News} />
                    <Route path='/setting' render={Setting} />
                    <Route path='/login' render={() => <Login />} />
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
    return <BrowserRouter>
        < Provider store={store} >
            <AppContainer />
        </Provider >
    </BrowserRouter >   
}

export default MainApp;