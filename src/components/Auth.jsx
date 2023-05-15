import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { redirect, useNavigate, Navigate, Link } from "react-router-dom";
import FormInput from "./FormInput.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import authHeader from "../services/AuthHeader.jsx";

export default function (props) {
  const [register, setRegister] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues = {
    username: "",
    password: "",
    password2: "",
  };
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [usernameInvalid, setUserInvalid] = useState(true);
  const [passwordInvalid, setPassInvalid] = useState(true);
  const [secondPasswordInvalid, setSecondPassInvalid] = useState(true);
  const [authError, setAuthError] = useState("");
  const API_URL = "https://localhost:7100/api/Users";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateThenLogin = () => {
    if (!register) {
      authUser(values.username, values.password);
    } else if (register) {
      if (values.password === values.password2) {
        authUser(values.username, values.password);
      } else {
        setAuthError("Passwords are not matching");
      }
    }
  };

  const authUser = (user, pass) => {
    if (register) {
      axios
        .post(API_URL + "/Create", {
          username: user,
          password: pass,
        })
        .then(function (response) {
          localStorage.setItem("jwt", JSON.stringify(response.data));
          localStorage.setItem("username", user);
          props.refetch();
          props.setLogged();
          navigate("/");
        })
        .catch(function (error) {
          setAuthError("User already exist");
          console.log(error);
        });
    } else {
      axios
        .post(API_URL + "/Login", { username: user, password: pass })
        .then((response) => {
          if (response.data) {
            localStorage.setItem("jwt", JSON.stringify(response.data));
            localStorage.setItem("username", user);
            props.refetch();
            props.setLogged();
            // navigate("/");
            handleClose();
          }
        })
        .catch(function (error) {
          setAuthError("Unable to login");
          console.log(error);
        });
    }
  };

  function setPasswordInvalid(param) {
    setPassInvalid(param);
  }
  function setSecondPasswordInvalid(param) {
    setSecondPassInvalid(param);
  }
  function setUsernameInvalid(param) {
    setUserInvalid(param);
  }
  function toggleRegister() {}

  function getLoginForm() {
    return (
      <div style={{ color: "white" }}>
        <Button
          variant="primary"
          className="float-end rounded-pill"
          onClick={handleShow}
        >
          Login
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  label="Username"
                  placeholder="Enter username"
                  onChange={handleInputChange}
                  value={values.username}
                />
                <Form.Text className="text-muted">
                  <ErrorMessage
                    text={props.value}
                    setInvalid={props.setInvalid}
                    error={props.error}
                    notError={props.notError}
                  />
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                  onChange={handleInputChange}
                  value={values.password}
                />
                <Form.Text className="text-muted">
                  <ErrorMessage
                    text={props.value}
                    setInvalid={props.setInvalid}
                    error={props.error}
                    notError={props.notError}
                  />
                </Form.Text>
              </Form.Group>
              <Link to={"/register"} onClick={handleClose}>
                Create an account
              </Link>

              <ErrorMessage justDisplay={true} authError={authError} />
              <Button variant="primary" onClick={validateThenLogin}>
                Login
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  /* function getSecondPassword() {
    return (
      <div style={{ color: "white"}}>
        <FormInput
          Name="password2"
          Type="password"
          Label="Confirm password"
          Placeholder="Confirm password"
          handleInputChange={handleInputChange}
          value={values.secondPassword}
          setInvalid={setSecondPasswordInvalid}
          error={props.error}
         notError={props.notError}
        />
      </div>
    );
  }*/

  /*
  function getButton(param) {
    return (
      <Button
        className="buttonButtonButton"
        variant="primary"
        onClick={validateThenLogin}
      >
        {param}
      </Button>
    );
  }


   */

  return (
    <div className="authWindow">
      <div className="loginForm">
        <div className="one">{getLoginForm()}</div>
        <ErrorMessage justDisplay={true} authError={authError} />
      </div>
    </div>
  );
}
