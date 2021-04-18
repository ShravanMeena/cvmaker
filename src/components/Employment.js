import React, { Component } from "react";
import "../style/pages/_bulder.scss";
import { DatePicker, Input, Tag } from "antd";
import axios from "axios";
import ButtonAndDataShow from "./ButtonAndDataShow";
const { TextArea } = Input;
const { CheckableTag } = Tag;

export default class Employment extends Component {
  constructor() {
    super();
    this.state = {
      // employment or internship
      job_title: "",
      company: "",

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

  addEmployment = () => {
    const { userData, getAllData } = this.props;

    const {
      job_title,
      company,
      city,
      description,
      start_date,
      end_date,

      state_change,
    } = this.state;
    if (
      !job_title ||
      !company ||
      !city ||
      !description ||
      !start_date ||
      !end_date
    ) {
      return alert("All fields are required!");
    }

    var _object = {
      job_title,
      company,
      city,
      description,
      start_date,
      end_date,
      postedBy: userData.data._id,
    };

    axios
      .post("https://cvmaker0799.herokuapp.com/api/employment", _object)
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
    console.log(nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  _saveDataToLocalStorage = () => {
    localStorage.setItem(
      "_employmentsTag",
      JSON.stringify(this.state.selectedTags)
    );
  };

  render() {
    const {
      // employment or internship
      job_title,
      company,
      // common
      city,
      description,
      start_date,
      end_date,
      state_change,
      selectedTags,
    } = this.state;

    const { employment } = this.props;

    if (!employment) {
      return <p>Not found any employment</p>;
    }

    return (
      <>
        <div className='inputFieldContainer'>
          {/* start */}
          <div className='singleField'>
            <h6>Job Title</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='job_title'
              value={job_title}
              placeholder=''
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Company</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='company'
              value={company}
              placeholder=''
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
              placeholder=''
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Description</h6>
            <TextArea
              onChange={(event) => this.handleChange(event)}
              name='description'
              value={description}
              row={5}
              placeholder=''
            />
          </div>
          {/* end */}
        </div>

        <ButtonAndDataShow
          addFunction={() => this.addEmployment()}
          state_change={state_change}
          title='employment'
          _saveDataToLocalStorage={this._saveDataToLocalStorage}
        />

        {employment &&
          employment.length > 0 &&
          employment.map((emp, i) => {
            return (
              <CheckableTag
                style={{
                  border: "1px solid #eee",
                  padding: 10,
                  marginBottom: 10,
                }}
                key={i}
                checked={selectedTags.indexOf(emp._id) > -1}
                onChange={(checked) =>
                  this.handleChangeForTag(emp._id, checked)
                }>
                <h5>
                  {emp.job_title} - {emp.company}
                </h5>
              </CheckableTag>
            );
          })}
      </>
    );
  }
}
