import {Card,
    Drawer,
    Input,
    Layout,
    Carousel,
    Collapse} from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import React from 'react';


import axios from 'axios';
import {createRef, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
//import Material UI
//import * as React from 'react';
import Button from '@mui/material/Button';
const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#2996ff',
};
const { Panel } = Collapse;
const text = './summary_ifase.txt';


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
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
  </Carousel>

   {/*<Layout>*/}

   {/*   <Content>*/}
   {/*       iFase: Real-time Face Recognition Application*/}
   {/*   </Content>*/}
   {/*   <Footer>Footer</Footer>*/}
   {/* </Layout>*/}

   {/*   <Carousel afterChange={onChange}>*/}
   {/*       <div>*/}
   {/*         <h3 style={contentStyle}>1</h3>*/}
   {/*       </div>*/}
   {/*       <div>*/}
   {/*         <h3 style={contentStyle}>2</h3>*/}
   {/*       </div>*/}
   {/*       <div>*/}
   {/*         <h3 style={contentStyle}>3</h3>*/}
   {/*       </div>*/}
   {/*       <div>*/}
   {/*         <h3 style={contentStyle}>4</h3>*/}
   {/*       </div>*/}
   {/* </Carousel>*/}

   {/* <Card*/}
   {/*   title="Default size card"*/}
   {/*   extra={<a href="#">More</a>}*/}
   {/*   style={{*/}
   {/*     width: 300,*/}
   {/*   }}*/}
   {/* >*/}
   {/*   <p>Card content</p>*/}
   {/*   <p>Card content</p>*/}
   {/*   <p>Card content</p>*/}
   {/* </Card>*/}
   {/* <Card*/}
   {/*   size="small"*/}
   {/*   title="Small size card"*/}
   {/*   extra={<a href="#">More</a>}*/}
   {/*   style={{*/}
   {/*     width: 300,*/}
   {/*   }}*/}
   {/* >*/}
   {/*   <p>Card content</p>*/}
   {/*   <p>Card content</p>*/}
   {/*   <p>Card content</p>*/}
   {/* </Card>*/}

  </>);
};