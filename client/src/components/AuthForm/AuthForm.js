import React, { useState } from "react";
import { Form, Input, Typography, Card, Space } from "antd";
import "./styles.css";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  LoginOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, signup } from "../../actions/authentication";
import Button from "react-bootstrap/Button";
const { Title } = Typography;

function AuthForm() {
  const currentYear = new Date().getFullYear();
  const authorName = "Houssame.";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(true);
  const onSubmit = (formValues) => {
    if (isLogin) {
      dispatch(login(formValues, navigate));
    } else {
      dispatch(signup(formValues, navigate));
    }
  };
  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };
  return (
    <div id="auth">
      <div id="auth-div">
        <Card id="auth_form_card">
          <Title id="auth_form_title" level={3}>
            {isLogin ? "Login to" : "Join"} Story Corner
          </Title>

          <Form
            id="auth_form"
            name="authform"
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
                      message: "Please enter your username",
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
              </>
            )}
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
              ]}
            >
              <Input
                type="email"
                prefix={<MailOutlined />}
                placeholder="Email Address"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input
                type="password"
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            {isLogin || (
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please repeat enter your password",
                  },
                ]}
              >
                <Input
                  type="password"
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
                />
              </Form.Item>
            )}
            <Form.Item>
              <Space>
                <Button type="submit" id="log_or_join">
                  {isLogin ? (
                    <>
                      <span>
                        <LoginOutlined /> Log In
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        <SkinOutlined /> Join
                      </span>
                    </>
                  )}
                </Button>

                <Button type="link" onClick={switchMode} id="rj">
                  {isLogin ? "Register Now" : "Have an Account"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <p id="copyright">
          <span>
            &copy; {currentYear} {authorName}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
