import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Badge, Button, Col, Container, Navbar, Row } from "react-bootstrap";
import "./styles.css";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";

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
    <Navbar id="header">
      <Container fluid>
        <Row id="row">
          <Col lg={6} id="col_title">
            <Link to="/">
              <span id="title">S-C</span>
            </Link>
          </Col>

          <Col lg={6} id="col_user">
            {!user ? (
              <Link to="/authform">
                <Button id="login">
                  <BiLogInCircle />
                  <span id="user_login">Log In</span>
                </Button>
              </Link>
            ) : (
              <div id="user_info">
                <Badge id="avatar" alt="username">
                  {user?.result?.username?.charAt(0)?.toUpperCase()}
                </Badge>
                <span id="user_title" level={4}>
                  {user?.result?.username?.toUpperCase()}
                </span>
                <Button onClick={logout}>
                  <BiLogOutCircle />
                  <span id="user_logout">Log Out</span>
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
