import React, { Component } from "react";

export default class Preview extends Component {
  render() {
    return <div>Preview</div>;
  }
}

// import React, { Component } from "react";
// import { Avatar, Divider, Image, Progress } from "antd";
// import {
//   PhoneOutlined,
//   EnvironmentOutlined,
//   MailOutlined,
// } from "@ant-design/icons";
// export default class Preview extends Component {
//   render() {
//     const personal_data = JSON.parse(localStorage.getItem("_personalData"));
//     const education = JSON.parse(localStorage.getItem("_educationsTag"));
//     const employment = JSON.parse(localStorage.getItem("_employmentsTag"));
//     const internship = JSON.parse(localStorage.getItem("_internshipsTag"));
//     const skills = JSON.parse(localStorage.getItem("_skillsTag"));
//     const languages = JSON.parse(localStorage.getItem("_languagesTag"));
//     const extras = JSON.parse(localStorage.getItem("_extraData"));

//     return (
//       <>
//         {/* header */}
//         <div className='header'>
//           <Avatar
//             size={80}
//             src={
//               <Image src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
//             }
//           />
//           <div className='name'>
//             <h4>
//               {personal_data.first_name} <span>{personal_data.last_name}</span>
//             </h4>
//             <p>{personal_data.job_title}</p>
//           </div>
//         </div>

//         {/* main section */}
//         <Divider />
//         <div className='main'>
//           <div className='resumeLeft'>
//             {/* contact */}
//             <div className='details'>
//               <h4>
//                 <PhoneOutlined style={{ color: "#0d1117", fontSize: 16 }} />{" "}
//                 <span> {personal_data.phone}</span>
//               </h4>

//               <h4>
//                 <MailOutlined style={{ color: "#0d1117", fontSize: 16 }} />{" "}
//                 <span>{personal_data.email}</span>
//               </h4>

//               <h4>
//                 <EnvironmentOutlined
//                   style={{ color: "#0d1117", fontSize: 16 }}
//                 />{" "}
//                 <span>{`${personal_data.address} ${personal_data.city} ${personal_data.country} ${personal_data.postal_code}`}</span>
//               </h4>

//               <br />
//               <div className='miniDetail'>
//                 <h1>Birth Date</h1>
//                 <p>{personal_data.dob}</p>
//               </div>
//               <div className='miniDetail'>
//                 <h1>Nationality</h1>
//                 <p>{personal_data.nationality}</p>
//               </div>

//               <div className='miniDetail'>
//                 <h1>Identity</h1>
//                 <p>{personal_data.identity}</p>
//               </div>
//             </div>

//             {/* skillls */}
//             <div className='skills'>
//               <h1>Skills</h1>
//               <div className='single'>
//                 <h4>MonogDb</h4>
//                 <Progress percent={60} status='active' />
//               </div>

//               <div className='single'>
//                 <h4>Express</h4>
//                 <Progress percent={70} status='active' />
//               </div>

//               <div className='single'>
//                 <h4>Reactjs</h4>
//                 <Progress percent={80} status='active' />
//               </div>

//               <div className='single'>
//                 <h4>NodeJs</h4>
//                 <Progress percent={60} status='active' />
//               </div>
//             </div>
//           </div>
//           <div className='resumeRight'>
//             {/* profile */}
//             <div className='profile'>
//               <h4>Profile</h4>
//               <p>{extras.professional_summary}</p>
//             </div>

//             {/* eductaion */}
//             <div className='education'>
//               <h4>Education</h4>
//               <h6>
//                 Hemwati nandan bahuguna garhwal unvivesity (A central
//                 university)
//               </h6>
//               <p>Srinagar | 2017-present</p>
//             </div>
//             {/* employment history */}
//             <div className='employment'>
//               <h4>Employment History</h4>
//               <h6>Co-founder - Monorbit</h6>
//               <p>Bhilwara | 2017-present</p>
//             </div>
//             {/* internships */}

//             <div className='internship'>
//               <h4>Internship</h4>
//               <h6>Software Developer, Enetstudiouz</h6>
//               <p>Delhi | 2019 December-2020 March</p>
//             </div>
//             {/* hobbies */}
//             <div className='hobbies'>
//               <h4>Hobbies</h4>
//               <p>
//                 My hobbies are, meeting new people, making new connections, and
//                 sharing ideas. I believe mutual learning and growth are what
//                 people seeking here.
//               </p>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
