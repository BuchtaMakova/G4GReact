import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { HashLink } from "react-router-hash-link";

export default function (props) {
  function formatDate(param) {
    let date = new Date(param);
    let offset = new Date().getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return format(date, "dd.MM.yyyy");
  }
  return (
    <div className="Subcategory-container">
      <Container fluid="lg">
        <Row className="border py-3 text-start">
          <Col className="text-lg-start col-sm-7 col-12 ">
            <HashLink
              to={
                "/Content/" +
                props.data.contentIdContent +
                "#" +
                props.data.idComment
              }
            >
              <div className="Overflow-container">{props.data.text}</div>
            </HashLink>
          </Col>

          <Col className="col-sm-5 col-12 text-sm-end text-start Overflow-container">
            {formatDate(props.data.posted ?? "")}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
