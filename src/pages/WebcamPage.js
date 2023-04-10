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
/*
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

*/

/*
STABLE using iframe
import { Button, Card, Drawer, Input } from 'antd';
import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import * as React from "react";


export const WebcamPage = () => {
  const [testContent, setTestContent] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const handleStartCaptureClick = () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'http://127.0.0.1:5000/test_func';
    iframe.width = '100%';
    iframe.height = '500px';
    document.querySelector('.camera-container').appendChild(iframe);
  };


  return (
    <div>
      <div className="camera-container"></div>
      <Button variant="contained" onClick={handleStartCaptureClick}>Start Recognizing</Button>

      <br />
      <Card>
        <p>{testContent}</p>
      </Card>
    </div>
  );

};
 */

import { Button, Card, Drawer, Input } from 'antd';
import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import * as React from "react";

export const WebcamPage = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handleTogglePause = () => {
    setIsPaused((prevState) => !prevState);
    axios.get('http://127.0.0.1:5000/stream_pause')
      .then((resp) => {
        console.log(resp);
      })
  };
  const handleStopFlag = () => {
    axios.get('http://127.0.0.1:5000/stream_stop')
      .then((resp) => {
        console.log(resp);
      })
    window.stop()
  };

  return (
    <div>
      <img src={`http://127.0.0.1:5000/test_func`} width="888" height="500"/>
      <br />
      <Button onClick={handleTogglePause}>
        {isPaused ? 'Resume' : 'Pause'}
      </Button>
        <Button onClick={handleStopFlag}>
        Stop
      </Button>
    </div>
  );
};