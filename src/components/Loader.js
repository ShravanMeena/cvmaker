import React, { Component } from "react";
import { Spin, Space } from "antd";

export default class Loader extends Component {
  state = {
    state_change: "Loading...",
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        state_change: "Please reload again",
      });
    }, 10000);
  }
  render() {
    return (
      <Space
        size='large'
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
        }}>
        <Spin size='large' />
        <h2 style={{ fontWeight: 300, color: "lightblue" }}>
          {this.state.state_change}
        </h2>
      </Space>
    );
  }
}
