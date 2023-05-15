import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import Comment from "./Comment.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import format from "date-fns/format";
import { useParams } from "react-router-dom";
import authHeader from "../services/AuthHeader.jsx";

export default function (props) {
  const [content, setContent] = useState([undefined]);
  const [contentId, setContentId] = useState(undefined);
  const [commentInvalid, setCommentInv] = useState(true);
  const [comment, setComment] = useState("");
  const [contentData, setContentData] = useState("");
  const [open, setOpen] = useState(false);
  let params = useParams();

  function triggerClose() {
    setOpen(false);
  }

  function openToggle() {
    setContentData(content.text);
    setOpen(!open);
  }

  function setCommentInvalid(param) {
    setCommentInv(param);
  }

  function getForm() {
    if (open) {
      return (
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="text">
              <Form.Label className="text-danger">Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter text"
                onChange={(e) => setContentData(e.target.value)}
                value={contentData}
                style={{ height: 270 }}
                className="getForm"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Button
              style={{ marginBottom: "10px" }}
              variant="primary"
              onClick={() => updateContent()}
            >
              Post
            </Button>
          </Form>
        </div>
      );
    } else {
      return <div className="Thread">{content?.text}</div>;
    }
  }

  function getButton() {
    if (props.logged) {
      if (props.account.username === content?.account?.username) {
        return (
          <Button style={{ marginBottom: "10px" }} onClick={() => openToggle()}>
            UPDATE
          </Button>
        );
      }
    }
  }

  function updateContent() {
    axios
      .put(
        "https://localhost:7100/api/Contents/Update",
        {
          id: content.idContent,
          headline: content.headline,
          text: contentData,
          accountIdAccount: props.account.idAccount,
          subcategoryIdSubcategory: content.subcategoryIdSubcategory,
        },
        {
          headers: authHeader(),
        }
      )
      .then(function (response) {
        fetchContent(contentId);
        props.refetch();
        setContentData("");
        setOpen(!open);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function postComment() {
    axios
      .post(
        "https://localhost:7100/api/Comments/Create",
        {
          text: comment,
          posted:
            format(new Date(), "yyyy-MM-dd") +
            "T" +
            format(new Date(), "kk:mm:ss"),
          accountIdAccount: props.account.idAccount,
          contentIdContent: contentId,
        },
        {
          headers: authHeader(),
        }
      )
      .then(function (response) {
        fetchContent(response.data.contentId);
        console.log(response);
        props.refetch();
        setComment("");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const fetchContent = (contentId) => {
    axios
      .get("https://localhost:7100/api/Contents/GetById?id=" + contentId)
      .then((response) => {
        setContent(response.data);
      });
  };

  useEffect(() => {
    fetchContent(contentId);
  }, [contentId]);

  useEffect(() => {
    setContentId(params.contentId);
  }, [params.contentId]);

  function triggerComment() {
    if (comment !== "") {
      postComment();
    }
  }

  function formatDate(param) {
    if (isNaN(new Date(param).getTime())) {
      // invalid date value
      return "";
    }
    let date = new Date(param);
    let offset = new Date().getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return format(date, "dd.MM.yyyy");
  }

  return (
    <div className="mt-5">
      <div className="Content-responsive Round-corners-content mb-5">
        {getButton()}
        <Container className="Round-corners-content" fluid="lg">
          <Row className="text-center Content-height">
            <Col className="col-12 text-start Content-left-side pl-2 pt-2 col-md-3">
              <div>
                <h5>{content?.account?.username}</h5>
              </div>
              <div>posts: {content?.account?.contentsPosted}</div>
              <div className="mb-3">
                replies: {content?.account?.commentsPosted}
              </div>
            </Col>
            <Col
              style={{ position: "relative" }}
              className="col-12 col-md-9 text-start pl-2 pt-2 Content-right-side"
            >
              <div>
                <h3> {content?.headline}</h3>
              </div>
              {getForm()}
              <div
                style={{
                  bottom: "0",
                  right: "0",
                  position: "absolute",
                  textAlign: "end",
                  color: "gray",
                }}
              >
                <label style={{ marginRight: "10px" }}>
                  {formatDate(content.posted)}
                </label>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Comment
        account={props.account}
        comments={content.comment}
        fetchContent={fetchContent}
        contentId={contentId}
        className="mt-3"
      />

      {props.logged ? (
        <Form className="mt-5 Cmnt-text-cnt">
          <Form.Group className="mb-3">
            <Form.Control
              style={{ height: 200 }}
              as="textarea"
              rows={3}
              placeholder="Enter comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <Form.Text className="text-muted">
              <ErrorMessage
                text={comment}
                setInvalid={setCommentInvalid}
                error={props.error}
                notError={props.notError}
              />
            </Form.Text>
          </Form.Group>

          <Button variant="primary" onClick={triggerComment} className="mb-5">
            Reply
          </Button>
        </Form>
      ) : (
        <Form className="mt-5 Cmnt-text-cnt">
          <Form.Group className="mb-3">
            <Form.Control
              style={{ height: 200 }}
              as="textarea"
              rows={3}
              id="output"
              placeholder="You are not logged in"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              disabled
              readOnly
            />
            <Form.Text className="text-muted">
              <ErrorMessage
                text={comment}
                setInvalid={setCommentInvalid}
                error={props.error}
                notError={props.notError}
              />
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            disabled
            onClick={triggerComment}
            className="mb-5"
          >
            Reply
          </Button>
        </Form>
      )}
    </div>
  );
}
