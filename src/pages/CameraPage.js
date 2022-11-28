import * as React from "react";
import Webcam from "react-webcam"
import * as ReactDOM from 'react-dom';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export const CameraPage = () =>{
    ReactDOM.render(
    <Webcam />,
    document.getElementById('root')
    );
}