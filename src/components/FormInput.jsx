import React from "react";
import { Form } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";
export default function (props) {
  return (
    <div className="messageInput">
      <Form.Group controlId={props.Name}>
        <Form.Label>{props.Label}</Form.Label>
        <Form.Control
          style={{ width: "100%" }}
          name={props.Name}
          type={props.Type}
          placeholder={props.Placeholder}
          onChange={props.handleInputChange}
          value={props.value}
        />
        <Form.Text>
          <ErrorMessage
            text={props.value}
            setInvalid={props.setInvalid}
            error={props.error}
            notError={props.notError}
          />
        </Form.Text>
      </Form.Group>
    </div>
  );
}
