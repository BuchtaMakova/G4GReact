import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import ContentCard from "./ContentCard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import CreateContent from "./CreateContent.jsx";

export default function (props) {
  const [data, setData] = useState([]);
  const [subCategory, setSub] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  let params = useParams();

  function triggerClose() {
    setOpen(false);
  }

  function openToggle() {
    setOpen(!open);
    console.log(open);
  }

  function updateContent(param) {
    fetchData(param);
  }

  const fetchData = (subcatId) => {
    axios
      .get(
        "https://localhost:7100/api/Contents/GetContents?subcategoryIdSubcategory=" +
          subcatId
      )
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
        //console.log(subcatId);
      });
  };

  const fetchSub = () => {
    axios
      .get(
        "https://localhost:7100/api/SubCategories/GetSubcategories?categoryIdCategory=" +
          props.category.idCategory
      )
      .then((response) => {
        setSub(response.data);
        console.log(props.category);
      });
  };

  const handleSubCatChange = (e) => {
    const selectedSubcatId = e.target.value;
    console.log(e.target.value);
    console.log(subCategory);
    props.setSub(selectedSubcatId);
    return selectedSubcatId;
  };

  useEffect(() => {
    if (props.sub !== undefined) {
      navigate("/SubCategory/" + props.sub);
    }
  }, [props.sub]);

  useEffect(() => {
    fetchData(params.subcatId);
  }, [params.subcatId]);

  useEffect(() => {
    fetchSub();
  }, []);

  return (
    <div className="Content">
      <div className="Filter-post-container">
        <Row>
          <Col className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
            <Button className="rounded-pill" onClick={openToggle}>
              Create post
            </Button>
          </Col>
          <Col className="col-12 col-md-6">
            <Form.Select value={props.sub} onChange={handleSubCatChange}>
              {subCategory.map((subcat) => (
                <option key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </div>

      <CreateContent
        open={open}
        error={props.error}
        notError={props.notError}
        triggerClose={triggerClose}
        sub={props.sub}
        data={data}
        account={props.account}
        isLogged={props.isLogged}
        logged={props.logged}
        sel={handleSubCatChange}
        updateContent={updateContent}
      />
      <div className="Category-container shadow">{props?.category?.name}</div>
      <div className="SubCategory-container shadow mb-3">
        <div className="ContentCard-stripe">
          <Container fluid="lg">
            <Row style={{ padding: "12px 0px 12px 0px" }}>
              <Col className="col-7 text-start">NAME</Col>
              <Col className="col-2 text-center">REPLIES</Col>
              <Col className="col-3 text-end">AUTHOR</Col>
            </Row>
          </Container>
        </div>
        {data.map((i) => (
          <div key={i.idContent}>
            <ContentCard data={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
