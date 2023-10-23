import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Badge, Button, Col, Container, Navbar, Row } from "react-bootstrap";
import "./styles.css";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import logo from '../../images/logo.png'

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
    <Navbar id="header" fixed="top">
      <Container fluid>
        <Row id="row">
          <Col lg={2} md={2} sm={2} xs={2} id="col_logo">
            <Link to="/">
              <img src={logo} alt="logo" id="logo"/>
            </Link>
          </Col>

          <Col lg={10} md={10} sm={10} xs={10} id="col_user">
            {!user ? (
              <Link to="/authform">
                <Button id="login">
                  <span>
                    <BiLogInCircle />
                  </span>
                  <span id="user_login">Log in</span>
                </Button>
              </Link>
            ) : (
              <div id="user_info">
                <Badge id="avatar" alt="username" bg="white">
                  {user?.result?.username?.charAt(0)?.toUpperCase()}
                </Badge>
                <span id="user_title" level={4}>
                  {user?.result?.username?.toUpperCase()}
                </span>
                <Button onClick={logout} id="logout">
                  <span>
                    <BiLogOutCircle />
                  </span>
                  <span id="user_logout">Log out</span>
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default AppBar;
