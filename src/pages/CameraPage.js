import * as React from "react";
import Webcam from "react-webcam";
import * as ReactDOM from 'react-dom';

export const CameraPage = () =>{
    ReactDOM.render(
    <Webcam />,
    document.getElementById('root')
    );
}