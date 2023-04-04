import {Button,Card, Drawer,Input} from 'antd';
import axios from 'axios';
import {useRef, useEffect, useState} from 'react';
import * as React from "react";


export const WebcamPage = () => {
     let newWindow;
  const webcam = () => {
        newWindow = window.open('http://127.0.0.1:5000/test_func');
    };

  const stop = () => {
      axios.get('http://127.0.0.1:5000/stream_pause')
          .then((resp) => {
              console.log(resp)
          })
  }

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

    return (
        <div>
            <Button variant="contained" onClick={webcam}>Start Recognizing</Button>
            <Button variant="contained" onClick={stop}>Pause/Resume</Button>
            <br/>
            <Button variant="contained" onClick={zoomIn}>Zoom In</Button>
            <Button variant="contained" onClick={zoomOut}>Zoom Out</Button>
        </div>
    );

}
// const videoRef = useRef(null);
//
//   useEffect(() => {
//     const mediaSource = new MediaSource();
//     videoRef.current.src = URL.createObjectURL(mediaSource);
//
//     mediaSource.addEventListener('sourceopen', () => {
//       const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
//
//       axios.get('http://127.0.0.1:5000/stream', {
//         responseType: 'blob',
//         onDownloadProgress: (progressEvent) => {
//           const data = progressEvent.currentTarget.response;
//           if (data) {
//             sourceBuffer.appendBuffer(data);
//           }
//         },
//       }).catch((error) => {
//         console.log(error);
//       });
//     });
//   }, []);
//
//   return <video ref={videoRef} autoPlay />;
// };