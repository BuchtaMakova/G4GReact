import React, { useState } from "react";
import SubCategory from "./SubCategory.jsx";
import { Container, Col, Row, Button } from "react-bootstrap";
import "../App.css";
import { Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function CollapseCategory(props) {
  const [open, setOpen] = useState(true);
  function getIcon() {
    if (open) {
      return faAngleUp;
    }
    return faAngleDown;
  }
  return (
    <div>
      <div className="Category-container shadow" onClick={() => setOpen(!open)}>
        <div className="CategoryName">{props.category.name}</div>
        <div className="Arrow">
          <FontAwesomeIcon
            icon={getIcon()}
            onClick={() => setOpen(!open)}
            aria-controls="collapse"
            className="Collapse-icon"
            size="lg"
          />
        </div>
      </div>

      <Collapse in={open}>
        <div id="collapse">
          <div className="SubCategory-stripe">
            <Container fluid="lg">
              <Row
                className="text-start text-lg-center"
                style={{ padding: "7px 0px 7px 0px" }}
              >
                <Col className="col-3 text-start">NAME</Col>
                <Col className="col-3">THREADS </Col>
                <Col className="col-3">REPLIES</Col>
                <Col className="col-3 text-lg-end">LAST POST</Col>
              </Row>
            </Container>
          </div>

          <SubCategory
            category={props.category}
            setCategory={props.setCategory}
            setSub={props.setSub}
          />
        </div>
      </Collapse>
    </div>
  );
}
export default CollapseCategory;
