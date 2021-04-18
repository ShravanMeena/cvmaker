import React, { Component } from "react";
import "../style/pages/_register.scss";
import { Alert, Button, Input } from "antd";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",

      state_change: null,
      loading: false,
    };
  }

  submitHandler = () => {
    const { email, password } = this.state;

    var _object = {
      email,
      password,
    };
    this.setState({
      loading: true,
    });
    axios
      .post("https://cvmaker0799.herokuapp.com/api/login", _object)
      .then((data) => {
        console.log(JSON.stringify(data));

        if (data.data.status) {
          localStorage.setItem("user", JSON.stringify(data.data));

          this.setState({
            state_change: "success",

            email: "",
            password: "",
            loading: false,
          });

          return;
        }

        return this.setState({
          state_change: "failed",
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err, "error aaya hian");
        this.setState({
          loading: false,
          state_change: "failed",
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { email, password, state_change, loading } = this.state;
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    if (!(userData === null)) {
      return <Redirect to='/' />;
    }

    return (
      <div className='registerMain'>
        <div className='registerDetails'>
          {/* <h4>Skills</h4> */}
          <h1>Login </h1>
          {state_change === "success" && (
            <Alert message='Login success' _type='success' />
          )}

          {state_change === "failed" && (
            <Alert message='Wrong password or email' _type='error' />
          )}
          <div className='inputFieldContainer'>
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
              disabled={!email || !password}
              size='large'
              onClick={this.submitHandler}
              style={{ marginTop: 10 }}>
              Login
            </Button>
            <p style={{ marginTop: 10 }}>
              Don't have an account? <Link to='/register'>Create account </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
