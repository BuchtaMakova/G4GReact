import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function (props) {
  return (
    <div className="Subcategory-container">
      <Container fluid="lg">
        <Row className="border py-3 text-start">
          <Col className="text-lg-start col-sm-7 col-12 Overflow-container">
            <Link to={"/Content/" + props.data.idContent}>
              <div>{props.data.headline}</div>
            </Link>
          </Col>

          <Col className="col-sm-2 col-12 text-sm-center">
            <span className="Content-labels">Replies: </span>
            {props.data.commentsCount}
          </Col>

          <Col className="col-sm-3 col-12 text-sm-end text-start Overflow-container">
            <span className="Content-labels">Author: </span>
            {props.data.account.username}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
