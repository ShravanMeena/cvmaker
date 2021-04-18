import React, { Component } from "react";
import "../style/pages/_bulder.scss";
import { DatePicker, Input, Tag } from "antd";
import ButtonAndDataShow from "./ButtonAndDataShow";
import axios from "axios";

const { TextArea } = Input;

const { CheckableTag } = Tag;

export default class Education extends Component {
  constructor() {
    super();
    this.state = {
      // education
      studies: "",
      university: "",

      // common
      city: "",
      description: "",
      start_date: "",
      end_date: "",

      state_change: 0,
      selectedTags: [],
    };
  }

  clearState = () => {
    this.setState({
      studies: "",
      university: "",
      city: "",
      description: "",
      start_date: "",
      end_date: "",
    });
  };
  addEducation = () => {
    const { userData, getAllData } = this.props;
    const {
      studies,
      university,
      city,
      description,
      start_date,
      end_date,

      state_change,
    } = this.state;

    if (
      !studies ||
      !university ||
      !city ||
      !description ||
      !start_date ||
      !end_date
    ) {
      return alert("All fields are required!");
    }

    var _object = {
      studies,
      university,
      city,
      description,
      start_date,
      end_date,
      postedBy: userData.data._id,
    };

    axios
      .post("https://cvmaker0799.herokuapp.com/api/education", _object)
      .then((data) => {
        console.log(JSON.stringify(data));
        this.setState({
          state_change: state_change + 1,
        });

        getAllData();
        this.clearState();
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
    this.setState({ selectedTags: nextSelectedTags });
  }

  _saveDataToLocalStorage = () => {
    localStorage.setItem(
      "_educationsTag",
      JSON.stringify(this.state.selectedTags)
    );
  };

  render() {
    const {
      // education
      studies,
      university,
      city,
      description,
      start_date,
      end_date,
      state_change,

      selectedTags,
    } = this.state;

    const { education } = this.props;

    if (!education) {
      return <p>Not found any education</p>;
    }
    return (
      <>
        <div className='inputFieldContainer'>
          {/* start */}
          <div className='singleField'>
            <h6>Studies</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='studies'
              value={studies}
              placeholder='Ex: B.tech, M.sc'
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>University</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='university'
              value={university}
              placeholder='Enter your college name'
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Start Date ({start_date})</h6>
            <DatePicker
              className='datePicker'
              onChange={(date, dateString) =>
                this.setState({ start_date: dateString })
              }
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>End Date ({end_date})</h6>
            <DatePicker
              className='datePicker'
              onChange={(date, dateString) =>
                this.setState({ end_date: dateString })
              }
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>City</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='city'
              value={city}
              placeholder='Enter city where you study'
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Description</h6>
            <TextArea
              row={5}
              onChange={(event) => this.handleChange(event)}
              name='description'
              value={description}
              placeholder='About study'
            />
          </div>
          {/* end */}
        </div>

        <ButtonAndDataShow
          addFunction={() => this.addEducation()}
          state_change={state_change}
          title='education'
          _saveDataToLocalStorage={this._saveDataToLocalStorage}
        />

        {/* <p>Please select your studies from below added by you </p> */}
        {education &&
          education.length > 0 &&
          education.map((ed, i) => {
            return (
              <CheckableTag
                style={{
                  border: "1px solid #eee",
                  padding: 10,
                  marginBottom: 10,
                }}
                key={i}
                checked={selectedTags.indexOf(ed._id) > -1}
                onChange={(checked) =>
                  this.handleChangeForTag(ed._id, checked)
                }>
                <h5>
                  {ed.studies} - {ed.university}
                </h5>
              </CheckableTag>
            );
          })}
      </>
    );
  }
}
