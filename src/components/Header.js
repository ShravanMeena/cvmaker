import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  IdcardOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";

export default class Header extends Component {
  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("_personalData");
    localStorage.removeItem("_skillsTag");
    localStorage.removeItem("_educationsTag");
    localStorage.removeItem("_languagesTag");
    localStorage.removeItem("_employmentsTag");
    localStorage.removeItem("_internshipsTag");

    window.location.reload();
  };
  render() {
    const userData = JSON.parse(localStorage.getItem("user"));

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 15,
          paddingLeft: 50,
          paddingRight: 50,
        }}>
        <Link to='/'>
          <p style={{ fontSize: 18, cursor: "pointer", color: "#1890ff" }}>
            <IdcardOutlined />{" "}
            <span
              style={{ color: "#1890ff", fontWeight: "bold", fontSize: 22 }}>
              CV
            </span>{" "}
            <span style={{ color: "#bbb" }}>Maker</span>
          </p>
        </Link>
        {!userData ? (
          <p style={{ fontSize: 20, cursor: "pointer" }}>
            <LoginOutlined /> <Link to='/login'>Login</Link>
          </p>
        ) : (
          <p style={{ fontSize: 20, cursor: "pointer" }} onClick={this.logout}>
            <LogoutOutlined /> Logout
          </p>
        )}
      </div>
    );
  }
}
