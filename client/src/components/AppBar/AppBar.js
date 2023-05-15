import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout, Typography, Button, Avatar, Row, Col, Space } from 'antd';
import "./styles.css"
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import decode from "jwt-decode";
import { PoweroffOutlined, LoginOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Header } = Layout;

function AppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const logout = useCallback(() => {
        dispatch({ type: LOGOUT });
        navigate("/authform");
        setUser(null);
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location, user?.token, logout]);


    return (
        <Header id="header">
            <Row>

                <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }} id='col_title'>
                    <Link to="/">
                        <Title id="title">STORY CORNER</Title>
                    </Link>
                </Col>

                <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }} id='col_user'>
                    {!user ? (
                        <Link to="/authform">
                            <Button shape="round" htmlType='button' id='login'>
                                <LoginOutlined /><span id='user_login'>Log In</span>
                            </Button>
                        </Link>
                    ) : (
                        <div id='user_info'>
                            <Space >
                                <Avatar id="avatar" alt='username' style={{ backgroundColor: 'wheat', color: 'black' }}>
                                    {user?.result?.username?.charAt(0)?.toUpperCase()}
                                </Avatar>
                                <Title id='user_title' level={4}>
                                    {user?.result?.username?.toUpperCase()}
                                </Title>
                                <Button danger shape="round" onClick={logout} htmlType='button'>
                                    <PoweroffOutlined /><span id='user_logout'>Log Out</span>
                                </Button>
                            </Space>
                        </div>
                    )
                    }
                </Col>

            </Row>
        </Header>
    )
}

export default AppBar