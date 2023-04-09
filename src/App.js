import "./App.css";
import { Menu } from "antd";
import { useState } from "react";
import React, { Component } from "react";
//import Ant design UI
import {
  FundViewOutlined,
  HomeOutlined,
  UploadOutlined,
  CameraOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { UploadPage } from "./pages/UploadPage";
import { WebcamPage } from "./pages/WebcamPage";
import { CameraPage } from "./pages/CameraPage";
import { WelcomePage } from "./pages/WelcomePage";
import { ViewPage } from "./pages/ViewPage";

const App = () => {
  const [currentMenu, setCurrentMenu] = useState("about");

  const menuItems = [
    {
      label: <HomeOutlined style={{ fontSize: "32px", marginTop: "12px" }} />,
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
      label: "People",
      key: "view",
      icon: <UserOutlined />,
    },

  ];

  const handleMenuClick = (ev) => {
    if (ev.key === "home") {
      window.location = "/";
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
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[currentMenu]}
        mode="horizontal"
        items={menuItems}
      />
      {page}
    </div>
  );
};

export default App;
