import {Avatar, Button, Col, Layout, Menu, Row} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUserLogin,  selectIsAuth} from '../../redux/auth-selectors';
import {logout} from "../../redux/auth-reducer";

export type MapPropsType = {}

export const Header: React.FC<MapPropsType> = (props) => {

    const {Header} = Layout;

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (
        <Header className="header" style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%'
        }} >
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}
                  style={{
                      position: 'fixed',
                      zIndex: 1,
                      width: '90%'
                  }}>

                <Row>
                    <Col span={17} style={{fontSize: 25}} >
                        SOCIAL NETWORK
                    </Col>
                    <Col span={2}>
                        <Avatar size="large" icon={<UserOutlined/>}/>
                    </Col>
                    <Col span={5}>
                        {isAuth ? <div style={{color: 'white'}}> {login+'    '}
                                <Button color="inherit" onClick={logoutCallback}>Logout</Button>
                            </div>
                            : <Button color="inherit"><NavLink to='/login'>LOGIN</NavLink></Button>}
                    </Col>
                </Row>
            </Menu>

        </Header>
    )
}