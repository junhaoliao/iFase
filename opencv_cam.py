import base64
import json
import os.path
import threading
from io import BytesIO

import face_recognition
from PIL import Image
from PIL.PngImagePlugin import PngInfo
from flask import Flask, request
import cv2
import numpy as np

video_capture = cv2.VideoCapture(0)


while True:
    # Grab a single frame of video
    ret, frame = video_capture.read()
    cv2.imshow("Press 'q' to quit", frame)
    cv2.waitKey(0)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
video_capture.release()
cv2.destroyAllWindows()




