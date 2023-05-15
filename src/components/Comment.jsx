import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { format } from "date-fns";
import axios from "axios";
import authHeader from "../services/AuthHeader.jsx";

export default function (props) {
  function formatDate(param) {
    let date = new Date(param);
    let offset = new Date().getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return format(date, "dd.MM.yyyy");
  }

  function deleteComment(commentId) {
    axios
      .delete("https://localhost:7100/api/Comments/Delete?id=" + commentId, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        console.log("deleted");
        props.fetchContent(props.contentId);
      });
  }

  function getButton(user, commentId) {
    if (user === props.account.username) {
      return <Button onClick={() => deleteComment(commentId)}>DELETE</Button>;
    }
  }

  return (
    <div>
      {props?.comments?.map((comment, index) => (
        <div>
          <div id={comment.idComment} style={{ marginTop: "30px" }}>
            <div className="Content-responsive Round-corners-comment">
              <Container className="Round-corners-comment" fluid="lg">
                <Row className="text-center Comment-height">
                  <Col className="col-12 text-start Content-left-side pl-2 pt-2 col-md-3">
                    <div>
                      <h5>{comment.accountUsername}</h5>
                    </div>
                    <div>posts: {comment.account.contentsPosted}</div>
                    <div>replies: {comment.account.commentsPosted}</div>
                  </Col>
                  <Col
                    style={{ position: "relative" }}
                    className="col-12 col-md-9 text-start pl-2 pt-2 Content-right-side"
                  >
                    <div className="text-end indexDelete">
                      {getButton(comment.accountUsername, comment.idComment)}
                      <h5>#{index + 1}</h5>
                    </div>
                    <div className="Thread">{comment.text}</div>
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
                        {formatDate(comment.posted ?? "")}
                      </label>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
