import React, { Component } from "react";
import "../style/pages/_bulder.scss";
import { DatePicker, Input } from "antd";
import ButtonAndDataShow from "./ButtonAndDataShow";
import axios from "axios";
export default class PersonalDetails extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      photo: "",
      job_title: "",
      dob: "",
      email: "",
      phone: "",
      country: "",
      nationality: "",
      city: "",
      address: "",
      postal_code: "",
      identity: "",
      state_change: false,
      uploading: false,
    };
  }

  onFileChange = (event) => {
    this.setState({
      uploading: true,
    });
    var formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    formdata.append("filetype", "IMG");
    axios({
      method: "post",
      url: `https://cvmaker0799.herokuapp.com/api/upload`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    })
      .then((res) => {
        this.setState({
          photo: res.data,
          uploading: false,
        });
      })
      .catch((err) => {
        this.setState({
          uploading: false,
        });
        console.log("Error : " + err);
      });
  };

  _saveDataToLocalStorage = () => {
    const {
      first_name,
      last_name,
      photo,
      job_title,
      dob,
      email,
      phone,
      country,
      nationality,
      city,
      address,
      postal_code,
      identity,
    } = this.state;
    if (
      !first_name ||
      !last_name ||
      !photo ||
      !job_title ||
      !dob ||
      !email ||
      !phone ||
      !country ||
      !nationality ||
      !city ||
      !address ||
      !postal_code ||
      !identity
    ) {
      return alert("All fields are required!");
    } else {
      localStorage.setItem("_personalData", JSON.stringify(this.state));
      alert("Added");
    }
  };

  componentDidMount() {
    const personal_data = JSON.parse(localStorage.getItem("_personalData"));
    if (personal_data) {
      this.setState({
        resume_title: this.state.resume_title,
        first_name: personal_data.first_name,
        last_name: personal_data.last_name,
        photo: personal_data.phone,
        job_title: personal_data.job_title,
        dob: personal_data.dob,
        email: personal_data.email,
        phone: personal_data.phone,
        country: personal_data.country,
        nationality: personal_data.nationality,
        city: personal_data.city,
        address: personal_data.address,
        postal_code: personal_data.postal_code,
        identity: personal_data.identity,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      first_name,
      last_name,
      photo,
      dob,
      email,
      phone,
      country,
      nationality,
      postal_code,
      identity,
      address,
      city,
      job_title,
    } = this.state;

    return (
      <>
        <div className='inputFieldContainer'>
          {/* start */}
          <div className='singleField'>
            <h6>First Name</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='first_name'
              value={first_name}
              placeholder=''
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Last Name</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='last_name'
              value={last_name}
              placeholder=''
            />
          </div>
          {/* end */}

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
            <h6>
              Date of birth <span>({dob})</span>
            </h6>
            <DatePicker
              className='datePicker'
              onChange={(date, dateString) =>
                this.setState({ dob: dateString })
              }
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Email</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='email'
              value={email}
              placeholder=''
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Phone</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='phone'
              value={phone}
              placeholder=''
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Country</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='country'
              value={country}
              placeholder=''
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Nationality</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='nationality'
              value={nationality}
              placeholder=''
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
            <h6>Address</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='address'
              value={address}
              placeholder=''
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Postal Code</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='postal_code'
              value={postal_code}
              placeholder=''
            />
          </div>
          {/* end */}

          {/* start */}
          <div className='singleField'>
            <h6>Identity number</h6>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='identity'
              value={identity}
              placeholder=''
            />
          </div>

          {/* start */}
          <div className='singleField'>
            <h6>Upload image</h6>
            <Input type='file' onChange={this.onFileChange} />
          </div>
          {/* end */}
          {photo && (
            <p style={{ width: "100%", color: "green" }}>image uploaded</p>
          )}
          <ButtonAndDataShow
            _saveDataToLocalStorage={this._saveDataToLocalStorage}
            type='personal'
          />
          {/* end */}
        </div>
      </>
    );
  }
}
