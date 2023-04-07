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
  const [testContent, setTestContent] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  let newWindow;

  const webcam = () => {
    newWindow = window.open('http://127.0.0.1:5000/test_func');
  };

  const stop = () => {
    axios.get('http://127.0.0.1:5000/stream_pause')
      .then((resp) => {
        console.log(resp);
        setIsPaused(prevState => !prevState);
      })
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        axios.get('http://127.0.0.1:5000/test_func')
          .then((resp) => {
            setTestContent(resp.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div>
      <Button variant="contained" onClick={webcam}>Start Recognizing</Button>
      <Button variant="contained" onClick={stop}>{isPaused ? "Resume" : "Pause"}</Button>
      <br />
      <Card>
        <p>{testContent}</p>
      </Card>
    </div>
  );

};