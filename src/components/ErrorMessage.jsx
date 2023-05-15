import React from "react";

export default function (props) {
  if (props.justDisplay) {
    return <div>{props.authError}</div>;
  } else {
    if (props.text === "") {
      return <div>{props.error}</div>;
    } else {
      return <div>{props.notError}</div>;
    }
  }
}