import React, { Component } from "react";
import "../style/pages/_bulder.scss";
import { Input, Tag, Select } from "antd";
import axios from "axios";
import ButtonAndDataShow from "./ButtonAndDataShow";

const { CheckableTag } = Tag;
const { Option } = Select;

export default class Skills extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      level: 1,

      state_change: 0,
      selectedTags: [],
    };
  }

  addSkills = () => {
    const { userData, getAllData } = this.props;
    const { name, level, state_change } = this.state;
    if (!name || !level) {
      return alert("All fields are required!");
    }
    var _object = {
      name,
      level,
      postedBy: userData.data._id,
    };

    axios
      .post("https://cvmaker0799.herokuapp.com/api/skill", _object)
      .then((data) => {
        console.log(JSON.stringify(data));

        getAllData();
        this.setState({
          state_change: state_change + 1,
          name: "",
          level: this.state.level,
        });
      })
      .catch((err) => {
        console.log(err, "error aaya hian");
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      level: parseInt(e),
    });
  };

  handleChangeForTag(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log(nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  _saveDataToLocalStorage = () => {
    localStorage.setItem("_skillsTag", JSON.stringify(this.state.selectedTags));
  };

  render() {
    const { name, state_change, selectedTags } = this.state;
    const { skill } = this.props;

    if (!skill) {
      return <p>Not found any skill</p>;
    }

    return (
      <>
        {/* <h4>Skills</h4> */}
        <div className="inputFieldContainer">
          {/* start */}
          <div className="singleField">
            <h6>Skill</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name="name"
              value={name}
              placeholder=""
            />
          </div>
          {/* end */}

          {/* start */}
          <div className="singleField">
            <h6>Level</h6>
            <Select
              className="datePicker"
              size="large"
              placeholder="Select a level"
              onChange={this.onChangeHandler}
            >
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </div>
          {/* end */}
        </div>
        <ButtonAndDataShow
          addFunction={() => this.addSkills()}
          title="skill"
          state_change={state_change}
          _saveDataToLocalStorage={this._saveDataToLocalStorage}
        />

        {skill &&
          skill.length > 0 &&
          skill.map((sk, i) => {
            return (
              <CheckableTag
                style={{
                  border: "1px solid #eee",
                  padding: 10,
                  marginBottom: 10,
                }}
                key={i}
                checked={selectedTags.indexOf(sk._id) > -1}
                onChange={(checked) => this.handleChangeForTag(sk._id, checked)}
              >
                <h5>{sk.name}</h5>
              </CheckableTag>
            );
          })}
      </>
    );
  }
}
