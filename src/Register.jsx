// import React, { useState } from "react";
// import {
//   Button,
//   Card,
//   Divider,
//   Input,
//   Space,
//   Tooltip,
// } from "antd";
// import {
//   EyeInvisibleOutlined,
//   EyeTwoTone,
//   InfoCircleOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import axios from "axios";
//
// export const Register = (props) => {
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//   const [name, setName] = useState("");
//
//   const handle_submit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post("http://localhost:5000/register", {
//       name,
//       email,
//       password: pass,
//     });
//
//     if (response.data.success) {
//       props.onRegister();
//     } else {
//       console.log(response.data.message);
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };
//
//   return (
//     <div className="register-container">
//       <Card className="auth-form-card">
//         <Divider className="register-divider">iFase Register</Divider>
//         <form className="register-form" onSubmit={handle_submit}>
//           <label htmlFor="name" className="form-label">
//             Account name
//           </label>
//           <Input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             type="name"
//             placeholder="Full Name"
//             id="name"
//             name="name"
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             className="form-input"
//           />
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <Input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="firstname.lastname@mail.utoronto.ca"
//             id="email"
//             name="email"
//             className="form-input"
//           />
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <Input.Password
//             value={pass}
//             onChange={(e) => setPass(e.target.value)}
//             type="password"
//             placeholder="**********"
//             id="password"
//             name="password"
//             className="form-input"
//             iconRender={(visible) =>
//               visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//             }
//           />
//           <Button className="submit-btn" type="primary">
//             Register
//           </Button>
//         </form>
//
//         <Button
//           className="login-btn"
//           onClick={() => props.onFormSwitch("login")}
//         >
//           Already have an account? Login Here
//         </Button>
//       </Card>
//     </div>
//   );
// };

import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Input,
  Space,
  Tooltip,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handle_submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/register", {
        name,
        email,
        password: pass,
      });

      if (response.data.success) {
        props.onRegister();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="register-container">
      <Card className="auth-form-card">
        <Divider className="register-divider">iFase Register</Divider>
        <form className="register-form" onSubmit={handle_submit}>
          <label htmlFor="name" className="form-label">
            Account name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            placeholder="Full Name"
            id="name"
            name="name"
            prefix={<UserOutlined className="site-form-item-icon" />}
            className="form-input"
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="firstname.lastname@mail.utoronto.ca"
            id="email"
            name="email"
            className="form-input"
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <Input.Password
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="**********"
            id="password"
            name="password"
            className="form-input"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Button className="submit-btn" type="primary" onClick={handle_submit}>
            Register
          </Button>
        </form>

        <Button
          className="login-btn"
          onClick={() => props.onFormSwitch("login")}
        >
          Already have an account? Login Here
        </Button>
      </Card>
    </div>
  );
};

