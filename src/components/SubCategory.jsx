import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessKnight,
  faGun,
  faShieldHalved,
  faTrophy,
  faComputer,
  faComputerMouse,
  faLaptop,
  faL,
  faPersonRifle,
  faGamepad,
  faX,
  faP,
} from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
library.add(
  faGun,
  faChessKnight,
  faShieldHalved,
  faTrophy,
  faComputer,
  faComputerMouse,
  faLaptop,
  faL,
  faPersonRifle,
  faGamepad,
  faX,
  faP
);

export default function (props) {
  const triggerCategory = () => {
    props.setCategory(props.category);
    console.log(props.category.idCategory);
  };

  const triggerSubcat = (e) => {
    props.setSub(e);
  };

  return (
    <div>
      {props?.category?.subCategory?.map((subCategory, index) => (
        <div key={index} className="SubCategory-container">
          <Container fluid="lg">
            <Row className="py-3 text-start text-lg-center border">
              <Col className="text-lg-start col-lg-3 col-12 col-sm-12 col-md-12">
                <Link
                  to={"/SubCategory/" + subCategory?.idSubcategory}
                  onClick={() => {
                    triggerSubcat(subCategory?.idSubcategory);
                    triggerCategory();
                  }}
                  className="subcategoryLink"
                >
                  <div
                    style={{
                      width: "30px",
                      float: "left",
                      marginRight: "10px",
                    }}
                    className="text-center"
                  >
                    <FontAwesomeIcon icon={subCategory?.icon} size="xl" />
                  </div>
                  {subCategory.name}
                </Link>
              </Col>
              <Col className="col-lg-3 col-12 col-sm-3 col-md-3">
                <span className="Count-labels">Threads: </span>
                {subCategory?.totalContentsInSubCategory}
              </Col>
              <Col className="col-lg-3 col-12 col-sm-3 col-md-3">
                <span className="Count-labels">Replies: </span>
                {subCategory?.totalCommentInInSubCategory}
              </Col>
              <Col className="text-sm-end text-md-start text-lg-end col-lg-3 col-sm-6 Overflow-container col-md-12">
                <span className="Count-labels">Last post: </span>
                <Link
                  to={
                    "/Content/" +
                    subCategory?.lastContentInSubCategory?.idContent
                  }
                  className="subcategoryLink"
                >
                  {subCategory?.lastContentInSubCategory?.headline}
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      ))}
    </div>
  );
}
