import React, { Component } from "react";
import "../style/pages/_resume.scss";

import { connect } from "react-redux";
import Original from "../components/resume/Original";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { BackwardFilled } from "@ant-design/icons";

class Resume extends Component {
  state = {
    data: null,
  };
  readResumeHandler = () => {
    const id = this.props.match.params.id;

    axios
      .get(`https://cvmaker0799.herokuapp.com/api/resume/${id}`)
      .then((data) => {
        // this.getAllData();

        console.log(JSON.stringify(data.data));

        this.setState({
          data: data.data,
        });
      })
      .catch((err) => {
        console.log(err, "error aaya hian");
      });
  };

  componentDidMount() {
    this.readResumeHandler();
  }

  render() {
    if (!this.state.data) {
      return <Loader />;
    }
    return (
      <>
        <div className="resumeContainer">
          <div
            style={{
              marginTop: 20,
              width: "90%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p>
              <Link to="/">
                <BackwardFilled /> Back to home
              </Link>
            </p>

            <p
              style={{
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {this.state.data.resume_title}
            </p>
          </div>
          <div className="innerResumeContainer">
            <Original data={this.state.data} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getResumeData: state.resumeReducer,
  };
};

export default connect(mapStateToProps, null)(Resume);
