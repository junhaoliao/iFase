// import React, { useState } from "react";
// import { Button, Card, Divider, Drawer, Input } from "antd";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { registerUser } from "index";
//
// export const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//
//   const handle_submit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await registerUser(email, pass, name);
//     if (response.success) {
//       props.onRegister();
//     } else {
//       // Show an error message if the registration is unsuccessful.
//       console.log(response.message);
//     }
//   } catch (error) {
//     // Show an error message if there is an exception.
//     console.log(error.message);
//   }
// };
//
//   return (
//     <div className="login-container">
//       <Card className="auth-form-card">
//         <Divider className="login-divider">iFase Login</Divider>
//
//         <form className="login-form" onSubmit={handle_submit}>
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
//             Log In
//           </Button>
//         </form>
//
//         <Button
//           className="register-btn"
//           onClick={() => props.onFormSwitch("register")}
//         >
//           Don't have an account? Register Here
//         </Button>
//       </Card>
//     </div>
//   );
// };

import React, { useState } from "react";
import { Button, Card, Divider, Drawer, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handle_submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password: pass,
      });
      if (response.data.success) {
        props.onLogin();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-container">
      <Card className="auth-form-card">
        <Divider className="login-divider">iFase Login</Divider>

        <form className="login-form" onSubmit={handle_submit}>
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
          <Button className="submit-btn" type="primary"onClick={handle_submit}>
            Log In
          </Button>
        </form>

        <Button
          className="register-btn"
          onClick={() => props.onFormSwitch("register")}
        >
          Don't have an account? Register Here
        </Button>
      </Card>
    </div>
  );
};
