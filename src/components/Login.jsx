import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import ErrorMessage from "./ErrorMessage.jsx";

export default function (props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [username, setUsername] = useState("");
  const [usernameInvalid, setUsernameInv] = useState(true);

  function setUsernameInvalid(param) {
    setUsernameInv(param);
  }

  const postUser = (param) => {
    axios
      .post("https://localhost:7022/api/Accounts", {
        username: param,
        password: "pass",
      })
      .then(function (response) {
        console.log(response);
        fetchAccount();
      })
      .catch(function (error) {
        console.log(error);
        fetchAccount();
      });
  };

  const triggerPost = () => {
    if (usernameInvalid === false) {
      postUser(username);
    }
  };

  function fetchAccount() {
    axios
      .get("https://localhost:7022/api/Accounts/" + username)
      .then((response) => {
        props.setAccount(response.data);
        props.setLogged(true);
      });
  }

  return (
    <>
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
                type="username"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <Form.Text className="text-muted">
                <ErrorMessage
                  text={username}
                  setInvalid={setUsernameInvalid}
                  error={props.error}
                  notError={props.notError}
                />
              </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={triggerPost}>
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
    </>
  );
}
