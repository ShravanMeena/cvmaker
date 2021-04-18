import React, { Component } from "react";
import "../style/pages/_landing.scss";
import { Empty, Button, Divider, Badge } from "antd";
import NoData from "../assets/empty.svg";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Redirect } from "react-router";
import Loader from "../components/Loader";
import Header from "../components/Header";

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }
  createCv = () => {
    this.props.history.push("/cv/design");
  };

  getAllData = () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      const _object = {
        email: userData.data.email,
      };
      axios
        .post(
          "https://cvmaker0799.herokuapp.com/api/resume/get-all-data",
          _object
        )
        .then((data) => {
          this.setState({
            data,
          });
        })
        .catch((err) => {
          console.log(err, "error aaya hian");
        });
    }
  };
  readResumeHandler = (id) => {
    this.props.history.push(`resume/${id}`);
  };

  componentDidMount() {
    this.getAllData();
    return;
  }

  deleteResumeHandler = (id) => {
    if (window.confirm("Press a button!")) {
      axios
        .delete(`https://cvmaker0799.herokuapp.com/api/resume/${id}`)
        .then((data) => {
          this.getAllData();
        })
        .catch((err) => {
          console.log(err, "error aaya hian");
        });
    } else {
    }
  };
  render() {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || !userData.token) {
      return <Redirect to='/login' />;
    }
    const { data } = this.state;
    if (!data) {
      return <Loader />;
    }
    return (
      <>
        <Header />
        <div className='main'>
          <div className='inner'>
            <div className='header'>
              <h4>
                Resumes <Badge count='Beta' />
              </h4>
              <Button onClick={this.createCv} type='primary'>
                <PlusOutlined />
                Create Now
              </Button>
            </div>
            <Divider />

            <div className='myResumesContainer'>
              {data && data.data.resume && !(data.data.resume.length === 0) ? (
                data.data.resume.map((r, i) => {
                  return (
                    <div className='myResume'>
                      {/* <img src='../assets/empty.svg' alt='ok' /> */}
                      {/* <h1>img</h1> */}
                      <h2 onClick={() => this.readResumeHandler(r._id)}>
                        {r.resume_title.substring(0, 50)}
                      </h2>
                      <h4>{r.job_title}</h4>
                      <p>{r.professional_summary.substring(0, 160)}</p>

                      <div className='footer'>
                        {/* <Button
                        type='link'
                        size='large'
                        onClick={() =>
                          alert(`update in future ==== ${r.resume_title}`)
                        }>
                        <TagOutlined />
                      </Button> */}

                        <Button
                          type='link'
                          size='large'
                          onClick={() => this.deleteResumeHandler(r._id)}>
                          <DeleteFilled style={{ color: "red" }} />
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className='resumeListContainer'>
                  <Empty
                    image={NoData}
                    imageStyle={{
                      height: 300,
                    }}
                    description={<h1>Create your first CV</h1>}>
                    <Button
                      onClick={this.createCv}
                      style={{ width: 200, height: 50, fontSize: 20 }}
                      type='primary'>
                      Create Now
                    </Button>
                  </Empty>
                </div>
              )}
            </div>

            {/* all resumes */}
          </div>
        </div>
      </>
    );
  }
}
