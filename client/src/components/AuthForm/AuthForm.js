import React, { useState } from 'react'
import { Form, Input, Button, Typography, Card, Space } from 'antd';
import "./styles.css"
import { LockOutlined, MailOutlined, UserOutlined, LoginOutlined, SkinOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, signup } from "../../actions/authentication";

const { Title } = Typography;

function AuthForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [isLogin, setIsLogin] = useState(true);
    const onSubmit = (formValues) => {
        if (isLogin) {
            dispatch(login(formValues, navigate))
        } else {
            dispatch(signup(formValues, navigate))
        }
    };
    const switchMode = () => {
        setIsLogin(prevIsLogin => !prevIsLogin);
    }
    return (

        <Card id='auth_form_card'>

            <Title id='auth_form_title' level={3}>
                {isLogin ? "Login to" : "Join"} Story Corner
            </Title>

            <Form
                id='auth_form'
                name='authform'
                layout="horizontal"
                form={form}
                onFinish={onSubmit}
            >
                {isLogin || (
                    <>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your username"
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder='Username' />
                        </Form.Item>
                    </>
                )}
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your email"
                        }
                    ]}
                >
                    <Input type='email' prefix={<MailOutlined />} placeholder='Email Address' />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your password"
                        }
                    ]}
                >
                    <Input type='password' prefix={<LockOutlined />} placeholder='Password' />
                </Form.Item>
                {isLogin || (
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please repeat enter your password"
                            }
                        ]}
                    >
                        <Input type='password' prefix={<LockOutlined />} placeholder='Confirm Password' />
                    </Form.Item>
                )}
                <Form.Item>
                    <Space>

                        <Button htmlType='submit' typeof='primary'>
                            {isLogin ? <><LoginOutlined /> Log In</> : <><SkinOutlined /> Join</>}
                        </Button>

                        <Button type='link' onClick={switchMode}>
                            {isLogin ? "Register Now" : "Have an Account"}
                        </Button>

                    </Space>
                </Form.Item>
            </Form>
        </Card>

    )
}

export default AuthForm