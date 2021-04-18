import React, { Component } from "react";
import "../style/pages/_bulder.scss";
import { Input, Divider, Button, Collapse } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { resumeAction } from "../redux/action/resumeAction";
import Skills from "../components/Skills";
import Languages from "../components/Languages";
import Education from "../components/Education";
import Employment from "../components/Employment";
import Internship from "../components/Internship";
import PersonalDetails from "../components/PersonalDetails";
import { Redirect } from "react-router";
import Loader from "../components/Loader";
import ResumeImage from "../assets/resume.svg";
import { BackwardFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Panel } = Collapse;
const { TextArea } = Input;

class Builder extends Component {
  constructor() {
    super();
    this.state = {
      resume_title: "",

      hobbies: "",
      professional_summary: "",

      userData: null,
      data: null,
      state_change: false,
      preview: false,
    };
  }

  resumeHandler = () => {
    if (!this.state.resume_title) {
      return alert("Resume title  is required");
    }

    const userData = JSON.parse(localStorage.getItem("user"));

    const personal_data = JSON.parse(localStorage.getItem("_personalData"));
    const education = JSON.parse(localStorage.getItem("_educationsTag"));
    const employment = JSON.parse(localStorage.getItem("_employmentsTag"));
    const internship = JSON.parse(localStorage.getItem("_internshipsTag"));
    const skills = JSON.parse(localStorage.getItem("_skillsTag"));
    const languages = JSON.parse(localStorage.getItem("_languagesTag"));

    if (!personal_data) {
      return alert("Personal detail all fields required");
    }

    if (!education) {
      return alert("At least 1 education is required");
    }

    if (!employment) {
      return alert("At least 1 employemnt is required");
    }

    if (!internship) {
      return alert("At least 1 internship is required");
    }

    if (!languages) {
      return alert("At least 1 language is required");
    }

    if (!skills) {
      return alert("At least 3 skills is required");
    }

    if (!this.state.professional_summary) {
      return alert("Professional summary is required");
    }

    if (!this.state.hobbies) {
      return alert("Hobbies is required");
    }

    const data = {
      resume_title: this.state.resume_title,
      first_name: personal_data.first_name,
      last_name: personal_data.last_name,
      photo: personal_data.photo,
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

      hobbies: this.state.hobbies,
      professional_summary: this.state.professional_summary,

      education,
      employment,
      internship,
      skills,
      languages,

      postedBy: userData.data._id,
    };
    axios
      .post("https://cvmaker0799.herokuapp.com/api/resume", data)
      .then((dataFromDb) => {
        alert("Resume save");
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

    this.setState({
      userData,
    });
  };
  componentDidMount() {
    this.getAllData();
    const extra_data = JSON.parse(localStorage.getItem("_extraData"));
    if (extra_data) {
      this.setState({
        resume_title: extra_data.resume_title,
        professional_summary: extra_data.professional_summary,
        hobbies: extra_data.hobbies,
      });
    }
  }

  previewHandler = () => {
    const { resume_title, hobbies, professional_summary } = this.state;
    const extras = {
      resume_title,
      hobbies,
      professional_summary,
    };

    localStorage.setItem("_extraData", JSON.stringify(extras));

    this.setState({
      preview: !this.state.preview,
    });
  };

  render() {
    const {
      resume_title,
      hobbies,
      professional_summary,
      userData,
      data,
    } = this.state;

    const userDataForAuth = JSON.parse(localStorage.getItem("user"));
    if (!userDataForAuth || !userDataForAuth.token) {
      return <Redirect to='/login' />;
    }

    if (!data) {
      return <Loader />;
    }

    const { education, employment, internship, language, skill } = data.data;

    return (
      <div className='builder'>
        <div className='left'>
          <div
            style={{
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}>
            <Link to='/'>
              <p>
                <BackwardFilled /> Back to home
              </p>
            </Link>
          </div>

          <div className='header'>
            <Input
              onChange={(event) => this.handleChange(event)}
              name='resume_title'
              value={resume_title}
              placeholder='You can add your resume title'
            />

            <Divider style={{ borderWidth: 3 }} />
          </div>

          <Collapse showArrow={true} bordered={false} defaultActiveKey={["1"]}>
            <Panel
              showArrow={true}
              className='title'
              header={<h4>Personal Details</h4>}
              key='1'>
              {/* personal details */}
              <div className='personalDetails'>
                <PersonalDetails />
              </div>
            </Panel>

            <Panel
              showArrow={true}
              className='title'
              header={<h4>Professional summary</h4>}
              key='2'>
              {/* professional summary */}
              <div className='professionalSummary'>
                {/* <h4>Professional summary</h4> */}
                <p>Add all the information about your studies or training</p>
                <TextArea
                  onChange={(event) => this.handleChange(event)}
                  name='professional_summary'
                  value={professional_summary}
                  row={5}
                  placeholder=''
                />
              </div>
            </Panel>

            <Panel
              showArrow={true}
              className='title'
              header={<h4>Education</h4>}
              key='3'>
              {/* education summary */}

              <div className='educationSummary'>
                {/* <Divider orientation='left' plain> */}
                {/* <h4>Education</h4> */}
                <p>Add all the information about your studies or training</p>

                <Education
                  userData={userData}
                  education={education}
                  getAllData={() => this.getAllData()}
                />
              </div>
            </Panel>
            <Panel
              showArrow={true}
              className='title'
              header={<h4>Skills</h4>}
              key='4'>
              {/* skills */}

              <div className='skillsContainer'>
                <Skills
                  userData={userData}
                  skill={skill}
                  getAllData={() => this.getAllData()}
                />
              </div>
            </Panel>

            <Panel
              showArrow={true}
              className='title'
              header={<h4>Employment History</h4>}
              key='5'>
              {/* employment summary */}

              <div className='employmentHistory'>
                {/* <Divider orientation='left' plain> */}
                {/* <h4>Employment History</h4> */}
                <p>Add your latest jobs starting with the most current</p>
                <Employment
                  userData={userData}
                  employment={employment}
                  getAllData={() => this.getAllData()}
                />
              </div>
            </Panel>
            <Panel
              showArrow={true}
              className='title'
              header={<h4>Practices</h4>}
              key='6'>
              {/* practices or internship summary */}
              <div className='internshipHistory'>
                <Internship
                  userData={userData}
                  internship={internship}
                  getAllData={() => this.getAllData()}
                />
              </div>
            </Panel>

            <Panel
              showArrow={true}
              className='title'
              header={<h4>Hobbies</h4>}
              key='7'>
              {/* hobbies */}

              <div className='professionalSummary'>
                <p>
                  Give a brief description here of the things you like to do
                </p>
                <TextArea
                  onChange={(event) => this.handleChange(event)}
                  name='hobbies'
                  value={hobbies}
                  row={5}
                  placeholder=''
                />
              </div>
            </Panel>

            <Panel
              showArrow={true}
              className='title'
              header={<h4>Languages</h4>}
              key='8'>
              {/* lannguages */}
              <div className='langsContainer'>
                <Languages
                  userData={userData}
                  language={language}
                  getAllData={() => this.getAllData()}
                />
              </div>
            </Panel>
          </Collapse>
          <div>
            {/* <Button
              size='large'
              style={{ marginTop: 20, marginRight: 10 }}
              onClick={() => this.previewHandler()}>
              Preview your resume
            </Button> */}

            <Button
              type='primary'
              size='large'
              style={{ marginTop: 20 }}
              onClick={() => this.resumeHandler()}>
              Save your resume
            </Button>
          </div>
        </div>

        <div className='right'>
          <div className='innerLeft'>
            <h1>Create your professional CV online with CV maker</h1>
            <h4>
              Create your very own professional CV and download it within 15
              minutes.
            </h4>

            <p>You'll be 65% more likely to get a job</p>
          </div>

          <img
            alt='viralimg'
            src={ResumeImage}
            style={{ objectFit: "contain", width: "100%", height: "60%" }}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendResumeData: (data) => dispatch(resumeAction(data)),
  };
};
export default connect(null, mapDispatchToProps)(Builder);
