import React, { useState } from "react";
import { Form, Input, Typography, Card, Space } from "antd";
import "./styles.css";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, signup } from "../../actions/authentication";
import Button from "react-bootstrap/Button";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { RiLoginCircleFill } from "react-icons/ri";

const { Title } = Typography;

function AuthForm() {
  window.history.pushState(null, document.title, window.location.href);
  window.addEventListener("popstate", function (event) {
    window.history.pushState(null, document.title, window.location.href);
  });
  const currentYear = new Date().getFullYear();
  const authorName = "Houssame.";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (formValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (isLogin) {
      await dispatch(login(formValues, navigate));
    } else {
      await dispatch(signup(formValues, navigate));
    }
    setIsSubmitting(false);
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
                <Button type="submit" id="log_or_join" disabled={isSubmitting}>
                  <RiLoginCircleFill />
                  {isSubmitting
                    ? "Wait a moment !"
                    : isLogin
                    ? "Log In"
                    : "Join"}
                </Button>
                <Button
                  type="link"
                  onClick={switchMode}
                  id="rj"
                  disabled={isSubmitting}
                >
                  {isLogin ? "Register Now" : "Have an Account"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <p id="copyright">
          <span id="social-icons">
            <a
              href="https://twitter.com/houssamedev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter size={25} />{" "}
            </a>
            <a
              href="https://github.com/houssame-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={25} />
            </a>
          </span>
          <span>
            &copy; {currentYear} {authorName}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
