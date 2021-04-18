import React, { Component } from "react";
import { Alert } from "antd";

export default class MessageAlert extends Component {
  render() {
    const { message, _type } = this.props;
    return <Alert message={message} type={_type} showIcon closable />;
  }
}
