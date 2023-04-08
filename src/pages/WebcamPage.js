/*
  const zoomIn = () => {
            axios.get('http://127.0.0.1:5000/stream_zoomIn')
                .then((resp) =>{
                    console.log(resp)
                })
  }

  const zoomOut = () => {
            axios.get('http://127.0.0.1:5000/stream_zoomOut')
                .then((resp) =>{
                    console.log(resp)
                })
        }
*/

import { Button, Card, Drawer, Input } from 'antd';
import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import * as React from "react";


export const WebcamPage = () => {

  let newWindow;

  const webcam = () => {
    newWindow = window.open('http://127.0.0.1:5000/test_func');
  };

  const stop = () => {
    axios.get('http://127.0.0.1:5000/stream_pause')
      .then((resp) => {
        console.log(resp);
      })
  };

  return (
    <div>
      <Button variant="contained" onClick={webcam}>Start Recognizing</Button>
      <Button variant="contained" onClick={stop}>Pause/Resume</Button>
      <br />
    </div>
  );

};