import { AreaChartOutlined, MessageOutlined, SettingOutlined, SoundOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, NavLink, Redirect, Route, withRouter } from "react-router-dom";
import { compose } from 'redux';
import './App.css';
import Preloader from './common/Preloader/Preloader';
import { LoginPage } from './components/Login/Login';
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Setting from "./components/Setting/Setting";
import UserPage from './components/Users/UsersContainer';
import { withSuspense } from './hoc/withSuspense';
import { initializeApp } from './redux/app-reducer';
import store, { AppStateType } from "./redux/redux-store";
import {Header} from "./components/Header/Header";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

const { Content, Footer, Sider } = Layout;

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedMusic = withSuspense(Music)
const SuspendedNews = withSuspense(News)
const SuspendedSetting = withSuspense(Setting)

class App extends Component<MapPropsType & DispatchPropsType> {
    captchAllUnhandledErrors = () => {
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

            <Layout>
                <Header />
                <Content style={{ padding: '50px 50px'}}>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}
                            style={{
                                overflow: 'auto',
                                height: '100vh',
                                position: 'fixed',
                                left: 25,
                                top: 75
                            }}>
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <Menu.Item key="1" icon={<UserOutlined />}><NavLink to="/Profile" > Profile</NavLink></Menu.Item>
                                <Menu.Item key="2" icon={<MessageOutlined />}><NavLink to="/Dialogs" > Messages</NavLink></Menu.Item>
                                <Menu.Item key="3" icon={<TeamOutlined />}><NavLink to="/Users" > Users</NavLink></Menu.Item>
                                <Menu.Item key="4" icon={<AreaChartOutlined />}><NavLink to="/News" > News</NavLink></Menu.Item>
                                <Menu.Item key="5" icon={<SoundOutlined />}><NavLink to="/Music" > Music</NavLink></Menu.Item>
                                <Menu.Item key="6" icon={<SettingOutlined />}><NavLink to="/Setting" > Setting</NavLink></Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280, marginLeft: 200 }}>
                            <Route path='/'
                                render={() => <Redirect to={"/profile"} />} />
                            <Route path='/login'
                                render={withSuspense(LoginPage)} />
                            <Route path='/dialogs'
                                render={() => <SuspendedDialogs />} />
                            <Route path='/profile/:userId?'
                                render={() => <SuspendedProfile />} />
                            <Route path='/users'
                                render={() => <UserPage pageTitle='Users' />} />
                            <Route path='/music' render={SuspendedMusic} />
                            <Route path='/news' render={SuspendedNews} />
                            <Route path='/setting' render={SuspendedSetting} />

                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Social Network ©2020 Created by Artsem Kez</Footer>
            </Layout>
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