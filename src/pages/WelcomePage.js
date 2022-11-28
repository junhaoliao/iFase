import {Card,
    Drawer,
    Input,
    Layout,
    Carousel,
    Collapse,
    Image} from 'antd';

import {
    TeamOutlined,
    SmileOutlined
} from '@ant-design/icons';

import { CaretRightOutlined } from '@ant-design/icons';
import React from 'react';
import cat668 from './cat668.png';
import sbd from './SBD.jpg';


import axios from 'axios';
import {createRef, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
//import Material UI
//import * as React from 'react';
import Button from '@mui/material/Button';
const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
    fontSize: '25px',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#2996ff',
};

const { Panel } = Collapse;

// const fs = require("fs");
// const text = fs.readFileSync('./summary_ifase.txt')

export const WelcomePage = () => {

    const { Header, Footer, Sider, Content } = Layout;

    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

  return (<>


    <Carousel effect="scrollx" autoplay="true">
        <div>
          <h3 style={contentStyle}>iFase: Real-time Recognition Application</h3>
        </div>
        <div>
          <h3 style={contentStyle}><Image width={150} src={cat668} /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><TeamOutlined />TEAM668</h3>
        </div>

  </Carousel>
<Collapse
    bordered={false}
    defaultActiveKey={['1']}
    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
    className="site-collapse-custom-collapse"
  >
    <Panel header="About this Application" key="1" className="site-collapse-custom-panel" >
      <p Align="left">{'It is widely agreed that students gain more confidence and build stronger relationships when instructors know their names. However, it is often difficult for the instructors to recognize and remember all the names of the students while the lecture size is relatively large.\n' +
          'To solve this problem, the team is proposing an application that helps the meeting participants to tell others’ names during the in-person meeting activities. The application will capture faces from videos/pictures through a User Interface that operates on web browsers and passes the data to a face recognition AI mechanism. User management systems will also be implemented to protect user privacy. With the Real-time Face Recognition Application, the team believes that instructors(users) will be able to quickly recognize and obtain basic information about their students.\n'}</p>
    </Panel>
    <Panel header="Our Motivation" key="2" className="site-collapse-custom-panel">
      <p Align="left">{
          'Many successful educators agree that students can be more confident and establish better connections when someone they respect like their professor calls them by their names. When universities adopted online meeting technologies during the COVID-19 pandemic, the name tag feature became a convenient tool for educators and fellow students. Now we resume back to in-person learning, we believe it is more important than ever for instructors to interact with students knowing their names in order to create a more comfortable and friendly environment for students and instructors. '
      }</p>
    </Panel>
    <Panel header="Our Scope of Work" key="3" className="site-collapse-custom-panel">
      <p Align="left">{
          'Our project consists of two main deliverables, a backend with face-recognition mechanism and a frontend User Interface (UI) operating on web browsers. \n' +
          'The scope of the project is to implement a product that allows users to label faces with names so that when the same faces appear again, they will be recognized and the names will be displayed. The product will be a web-based application. Therefore, designing and implementing a frontend user interface that operates in web browsers is within the scope. \n' +
          'As part of the project, a user management system and a database are also included. The user interface(UI) will either accept a photo file uploaded by the user or ask permission for a web camera to capture snapshots of the user. These input images will be handed to the backend and if a match is found the application outputs and displays the name of the corresponding face. Additionally, as it is essential to protect users’ privacy, different user groups and privacy levels will be implemented within the user management system.\n' +
          'However, since we are using an open-source library for facial recognition, the accuracy and performance cannot be guaranteed. Therefore, deciding whether the image is a human face or not will also not be within the scope, yet we will notify the user the case where no human face is detected.\n'
      }</p>
    </Panel>

    <Panel header="System Block Diagram" key="3" className="site-collapse-custom-panel">
      <p Align="left">{
        <Image width={800} src={sbd} />
      }</p>
    </Panel>

  </Collapse>


  </>);
};