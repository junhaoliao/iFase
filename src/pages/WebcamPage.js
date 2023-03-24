import {Button,Card, Drawer,Input} from 'antd';
import axios from 'axios';
import {useRef, useEffect, useState} from 'react';
import * as React from "react";

export const WebcamPage = () => {
const videoRef = useRef(null);

  useEffect(() => {
    const mediaSource = new MediaSource();
    videoRef.current.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener('sourceopen', () => {
      const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

      axios.get('http://127.0.0.1:5000/stream', {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const data = progressEvent.currentTarget.response;
          if (data) {
            sourceBuffer.appendBuffer(data);
          }
        },
      }).catch((error) => {
        console.log(error);
      });
    });
  }, []);

  return <video ref={videoRef} autoPlay />;
};