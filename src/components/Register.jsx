import { Button, Form } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage.jsx";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function (props) {
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameInvalid, setUsernameInv] = useState(true);
  const initialValues = {
    username: "",
    password: "",
    password2: "",
  };
  const [values, setValues] = useState(initialValues);
  const API_URL = "https://localhost:7100/api/Users/Create";
  const [birthdate, setBirthdate] = useState(new Date());
  const [age, setAge] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const calculateAge = (dateOfBirth) => {
    setBirthdate(dateOfBirth);
    const currentDate = moment();
    const dob = moment(dateOfBirth);
    setAge(currentDate.diff(dob, "years"));
  };

  const validateThenRegister = () => {
    if (values.password === values.password2) {
      if (age >= 18) {
        authUser(values.username, values.password);
      } else {
        notify();
      }
    } else {
      setAuthError("Passwords are not matching");
    }
  };
  const authUser = (user, pass) => {
    axios
      .post(API_URL, {
        userName: user,
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
  };

  const notify = () => {
    toast.error("Not old enough", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Form>
      <h1 style={{ color: "white" }}>Register</h1>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label style={{ color: "white" }}>Username</Form.Label>
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
        <Form.Label style={{ color: "white" }}>Password</Form.Label>
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

      <Form.Group className="mb-3" controlId="password2">
        <Form.Label style={{ color: "white" }}>
          Confirm your password
        </Form.Label>
        <Form.Control
          name="password2"
          type="password"
          label="Confirm password"
          placeholder="Enter password second time"
          onChange={handleInputChange}
          value={values.password2}
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
      <input type="date" onChange={(e) => calculateAge(e.target.value)} />
      <Link to={"/"}>Do you already have an account?</Link>

      <ErrorMessage justDisplay={true} authError={authError} />
      <Button variant="primary" onClick={validateThenRegister}>
        Register
      </Button>
      <Button variant="primary" onClick={notify}>
        haha
      </Button>
      <ToastContainer />
    </Form>
  );
}
