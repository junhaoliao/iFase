/* the following code opens a webcam of on a separate page
import * as React from "react";
import Webcam from "react-webcam";
import * as ReactDOM from 'react-dom';
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export const CameraPage = () =>{
    ReactDOM.render(
    <Webcam />,
    document.getElementById('root') // uses index.html
    );
}*/

import React, { useState, useEffect } from 'react';

export const CameraPage = () => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (!stream) return;
    const video = document.querySelector('video');
    video.srcObject = stream;
  }, [stream]);

  const handleStart = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(s => setStream(s))
      .catch(err => console.error(err));
  };

  const handleStop = () => {
    setStream(null);
  };

  return (
    <div>
      <div style={{ width: '1280px', height: '480px' }}>
        {stream ? (
          <video style={{ width: '100%', height: '100%' }} autoPlay playsInline muted />
        ) : (
          <p>Your Web Camera is Off</p>
        )}
      </div>
      <div>
        {stream ? (
          <button onClick={handleStop}>Stop</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
      </div>
    </div>
  );
};


