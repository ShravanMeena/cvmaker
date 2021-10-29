import React, { Component } from "react";
import { Avatar, Button, Divider, Image, Progress } from "antd";
import IMAGEFROMBACKEND from "../../assets/2re.png";

import {
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from "@ant-design/icons";
export default class Original extends Component {
  _exportPdf = () => {
    alert("working on it");
  };
  render() {
    const { data } = this.props;
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="header">
            <Avatar
              size={80}
              src={
                <Image src={IMAGEFROMBACKEND} style={{ objectFit: "cover" }} />
              }
            />
            <div className="name">
              <h4>
                {data.first_name} <span>{data.last_name}</span>
              </h4>
              <p>{data.job_title}</p>
            </div>
          </div>
          <Button onClick={() => this._exportPdf()}>Download</Button>
        </div>

        {/* main section */}
        <Divider />
        <div className="main">
          <div className="resumeLeft">
            {/* contact */}
            <div className="details">
              <h4>
                <PhoneOutlined style={{ color: "#0d1117", fontSize: 16 }} />{" "}
                <span> {data.phone}</span>
              </h4>

              <h4>
                <MailOutlined style={{ color: "#0d1117", fontSize: 16 }} />{" "}
                <span>{data.email}</span>
              </h4>

              <h4>
                <EnvironmentOutlined
                  style={{ color: "#0d1117", fontSize: 16 }}
                />{" "}
                <span>{`${data.address}, ${data.city}, ${data.country}, ${data.postal_code}`}</span>
              </h4>

              <br />
              <div className="miniDetail">
                <h1>Birth Date</h1>
                <p>{data.dob}</p>
              </div>
              <div className="miniDetail">
                <h1>Nationality</h1>
                <p>{data.nationality}</p>
              </div>

              <div className="miniDetail">
                <h1>Identity</h1>
                <p>{data.identity}</p>
              </div>
            </div>

            {/* skillls */}
            {data.skills && (
              <div className="skills">
                <h1>Skills</h1>

                {data.skills.map((item) => {
                  return (
                    <div className="single" style={{ marginTop: 5 }}>
                      <h4>{item.name}</h4>
                      {item.level === 1 && (
                        <Progress percent={25} status="active" />
                      )}
                      {item.level === 2 && (
                        <Progress percent={50} status="active" />
                      )}
                      {item.level === 3 && (
                        <Progress percent={75} status="active" />
                      )}
                      {item.level === 4 && (
                        <Progress percent={100} status="active" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {data.languages && (
              <div className="skills">
                <h1>Languages</h1>

                {data.languages.map((item) => {
                  return (
                    <div className="single">
                      <h4>{item.name}</h4>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="resumeRight">
            {/* profile */}
            <div className="profile">
              <h4>Profile</h4>
              <p>{data.professional_summary}</p>
            </div>

            {/* eductaion */}
            <div className="education">
              <h4>Education</h4>
              {data.education.map((item, i) => {
                return (
                  <>
                    <h6>{item.studies}</h6>
                    <p>
                      {item.city} | {item.start_date}-{item.end_date}
                    </p>
                  </>
                );
              })}
            </div>
            {/* employment history */}
            <div className="employment">
              <h4>Employment History</h4>

              {data.employment.map((item, i) => {
                return (
                  <>
                    <h6>
                      {item.job_title} - {item.company}
                    </h6>
                    <p>
                      {item.start_date}-{item.end_date}
                    </p>
                  </>
                );
              })}
            </div>
            {/* internships */}

            <div className="internship">
              <h4>Internship</h4>
              {data.internship.map((item, i) => {
                return (
                  <>
                    <>
                      <h6>
                        {item.job_title} - {item.company}
                      </h6>
                      <p>
                        {item.start_date}-{item.end_date}
                      </p>
                    </>
                  </>
                );
              })}
            </div>
            {/* hobbies */}
            <div className="hobbies">
              <h4>Hobbies</h4>
              <p>{data.hobbies}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
