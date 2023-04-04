// import "./App.css";
// import { Menu } from "antd";
// import { useState } from "react";
// import { Login } from "./Login";
// import { Register } from "./Register";
// import {
//   FundViewOutlined,
//   HomeOutlined,
//   UploadOutlined,
//   CameraOutlined,
//   NotificationOutlined,
// } from "@ant-design/icons";
//
// import { UploadPage } from "./pages/UploadPage";
// import { WebcamPage } from "./pages/WebcamPage";
// import { CameraPage } from "./pages/CameraPage";
// import { WelcomePage } from "./pages/WelcomePage";
//
// const App = () => {
//   const [currentForm, setCurrentForm] = useState("login");
//   const [currentMenu, setCurrentMenu] = useState("about");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//
//   const toggleForm = (formName) => {
//     setCurrentForm(formName);
//   };
//
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//   };
//   //
//   // const handle_form_switch = (formType) => {
//   //   setFormType(formType);
//   // };
//
//   const menuItems = [
//     {
//       label: (
//         <HomeOutlined style={{ fontSize: "32px", marginTop: "12px" }} />
//       ),
//       key: "home",
//     },
//     {
//       label: "About",
//       key: "about",
//       icon: <NotificationOutlined />,
//     },
//     {
//       label: "Upload",
//       key: "upload",
//       icon: <UploadOutlined />,
//     },
//     {
//       label: "Camera",
//       key: "camera",
//       icon: <CameraOutlined />,
//     },
//     {
//       label: "Web Camera",
//       key: "webcam",
//       icon: <FundViewOutlined />,
//     },
//     {
//       label: "Logout",
//       key: "logout",
//       onClick: handleLogout,
//     },
//   ];
//
//   const handleMenuClick = (ev) => {
//     if (ev.key === "home") {
//       window.location = "/";
//     } else {
//       setCurrentMenu(ev.key);
//     }
//   };
//
//   let page = null;
//   if (currentMenu === "upload") {
//     page = <UploadPage />;
//   }
//   if (currentMenu === "about") {
//     page = <WelcomePage />;
//   }
//   if (currentMenu === "webcam") {
//     page = <WebcamPage />;
//   }
//   if (currentMenu === "camera") {
//     page = <CameraPage />;
//   }
//
//   return (
//     <div className="App">
//       {isLoggedIn ? (
//         <>
//           <Menu
//             onClick={handleMenuClick}
//             selectedKeys={[currentMenu]}
//             mode="horizontal"
//           >
//             {menuItems.map((item) => (
//               <Menu.Item key={item.key} icon={item.icon}>
//                 {item.label}
//               </Menu.Item>
//             ))}
//           </Menu>
//           {page}
//         </>
//       ) : currentForm === "login" ? (
//         <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
//       ) : (
//         <Register onFormSwitch={toggleForm} onRegister={handleLogin} />
//       )}
//     </div>
//   );
// };
//
// export default App;

import "./App.css";
import { Menu } from "antd";
import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import {
  FundViewOutlined,
  HomeOutlined,
  UploadOutlined,
  CameraOutlined,
  NotificationOutlined,
  LogoutOutlined,
  FolderViewOutlined
} from "@ant-design/icons";

import { UploadPage } from "./pages/UploadPage";
import { WebcamPage } from "./pages/WebcamPage";
import { CameraPage } from "./pages/CameraPage";
import { WelcomePage } from "./pages/WelcomePage";
import { ViewPage } from "./pages/ViewPage";

const App = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [currentMenu, setCurrentMenu] = useState("about");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const menuItems = [
    {
      label: (
        <HomeOutlined style={{ fontSize: "32px", marginTop: "12px" }} />
      ),
      key: "home",
    },
    {
      label: "About",
      key: "about",
      icon: <NotificationOutlined />,
    },
    {
      label: "Upload",
      key: "upload",
      icon: <UploadOutlined />,
    },
    {
      label: "Camera",
      key: "camera",
      icon: <CameraOutlined />,
    },
    {
      label: "Web Camera",
      key: "webcam",
      icon: <FundViewOutlined />,
    },
    {
      label: "View ",
      key: "view",
      icon: <FolderViewOutlined />,
    },
  ];

  const handleMenuClick = (ev) => {
    if (ev.key === "home") {
      setCurrentMenu("about");
      return
    } else {
      setCurrentMenu(ev.key);
    }
  };

  let page = null;
  if (currentMenu === "upload") {
    page = <UploadPage />;
  }
  if (currentMenu === "about") {
    page = <WelcomePage />;
  }
  if (currentMenu === "webcam") {
    page = <WebcamPage />;
  }
  if (currentMenu === "camera") {
    page = <CameraPage />;
  }
  if (currentMenu === "view") {
    page = <ViewPage />;
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Menu
            onClick={handleMenuClick}
            selectedKeys={[currentMenu]}
            mode="horizontal"
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              onClick={handleLogout}

            >
              Logout
            </Menu.Item>
          </Menu>
          {page}
        </>
      ) : currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
      ) : (
        <Register onFormSwitch={toggleForm} onRegister={handleLogin} />
      )}
    </div>
  );
};

export default App;
