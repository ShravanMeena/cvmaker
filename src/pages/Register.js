import React, { Component } from "react";
import "../style/pages/_register.scss";
import { Alert, Button, Input } from "antd";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      loading: false,
      state_change: false,
    };
  }

  submitHandler = () => {
    const { name, email, password } = this.state;

    var _object = {
      name,
      email,
      password,
    };
    this.setState({
      loading: true,
    });
    axios
      .post("https://cvmaker0799.herokuapp.com/api/register", _object)
      .then((data) => {
        console.log(JSON.stringify(data));
        this.setState({
          state_change: "success",

          name: "",
          email: "",
          password: "",
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err, "error aaya hian");
        this.setState({
          loading: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { name, email, password, state_change, loading } = this.state;
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    if (!(userData === null)) {
      return <Redirect to='/' />;
    }
    return (
      <div className='registerMain'>
        {/* <Link to='/'>
          <HomeOutlined style={{ fontSize: 40 }} />
        </Link> */}
        <div className='registerDetails'>
          {/* <h4>Skills</h4> */}
          <h1>Create your acccount</h1>
          {state_change && (
            <Alert message='Registered succesfully' _type='success' />
          )}
          <div className='inputFieldContainer'>
            {/* start */}
            <div className='singleField'>
              <h6>Name</h6>
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
              <h6>Email</h6>
              <Input
                onChange={(event) => this.handleChange(event)}
                name='email'
                value={email}
                placeholder=''
              />
            </div>

            {/* start */}
            <div className='singleField'>
              <h6>Password</h6>
              <Input
                onChange={(event) => this.handleChange(event)}
                name='password'
                type='password'
                value={password}
                placeholder=''
              />
            </div>
            {loading && "Loading..."}

            <Button
              disabled={!email || !password || !name}
              size='large'
              onClick={this.submitHandler}
              style={{ marginTop: 10 }}>
              Register
            </Button>
            <p style={{ marginTop: 10 }}>
              Already have an account? <Link to='/login'>Login here</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
