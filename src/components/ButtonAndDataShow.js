import React, { Component } from "react";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  PlusCircleFilled,
  SaveFilled,
} from "@ant-design/icons";

export default class ButtonAndDataShow extends Component {
  render() {
    const { title, addFunction, _saveDataToLocalStorage, type } = this.props;
    return (
      <>
        {type ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}>
            <Button
              type='button'
              size='large'
              onClick={_saveDataToLocalStorage}>
              <SaveFilled /> Save your personal info
            </Button>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}>
            <Button type='link' size='large' onClick={addFunction}>
              <PlusCircleFilled /> Add {title}
            </Button>

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <p>
                After select tags please save your data click here
                <ArrowRightOutlined />
              </p>
              <Button
                type='button'
                size='large'
                onClick={_saveDataToLocalStorage}>
                <SaveFilled /> Save
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
}
