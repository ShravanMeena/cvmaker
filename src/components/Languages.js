import React, { Component } from "react";
import "../style/pages/_bulder.scss";
import { Input, Tag, Select } from "antd";
import axios from "axios";
import ButtonAndDataShow from "./ButtonAndDataShow";

const { CheckableTag } = Tag;
const { Option } = Select;

export default class Languages extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      level: 1,

      state_change: 0,
      selectedTags: [],
    };
  }

  addLanguage = () => {
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
      .post("https://cvmaker0799.herokuapp.com/api/language", _object)
      .then((data) => {
        console.log(JSON.stringify(data));

        getAllData();
        this.setState({
          state_change: state_change + 1,
          name: "",
          level: 1,
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

  handleChangeForTag(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log(nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }
  _saveDataToLocalStorage = () => {
    localStorage.setItem(
      "_languagesTag",
      JSON.stringify(this.state.selectedTags)
    );
  };

  onChangeHandler = (value) => {
    this.setState({
      level: value,
    });
  };

  render() {
    const { name, state_change, selectedTags } = this.state;
    const { language } = this.props;

    if (!language) {
      return <p>Not found any language</p>;
    }
    return (
      <>
        {/* <h4>Skills</h4> */}
        <div className='inputFieldContainer'>
          {/* start */}
          <div className='singleField'>
            <h6>Language</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='name'
              value={name}
              placeholder=''
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Level</h6>
            <Select
              className='datePicker'
              size='large'
              placeholder='Select a level'
              onChange={this.onChangeHandler}>
              <Option value='0'>0</Option>
              <Option value='1'>1</Option>
              <Option value='2'>2</Option>
              <Option value='3'>3</Option>
              <Option value='4'>4</Option>
            </Select>
          </div>
          {/* end */}
        </div>
        <ButtonAndDataShow
          addFunction={() => this.addLanguage()}
          title='language'
          state_change={state_change}
          _saveDataToLocalStorage={this._saveDataToLocalStorage}
        />
        {language &&
          language.length > 0 &&
          language.map((ln, i) => {
            return (
              <CheckableTag
                style={{
                  border: "1px solid #eee",
                  padding: 10,
                  marginBottom: 10,
                }}
                key={i}
                checked={selectedTags.indexOf(ln._id) > -1}
                onChange={(checked) =>
                  this.handleChangeForTag(ln._id, checked)
                }>
                <h5>{ln.name}</h5>
              </CheckableTag>
            );
          })}
      </>
    );
  }
}
