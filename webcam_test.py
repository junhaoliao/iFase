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

obama_image = face_recognition.load_image_file("obama.jpg")
obama_face_encoding = face_recognition.face_encodings(obama_image)[0]

snake_image = face_recognition.load_image_file("snake.jpg")
snake_face_encoding = face_recognition.face_encodings(snake_image)[0]

biden_image = face_recognition.load_image_file("biden.jpg")
biden_face_encoding = face_recognition.face_encodings(biden_image)[0]

face_names = ["Barack Obama", "snake", "Joe Biden"]
face_encodings = [obama_face_encoding, snake_face_encoding, biden_face_encoding]

while True:
    # Grab a single frame of video
    ret, frame = video_capture.read()
    rgb_frame = frame[:, :, ::-1]
    face_locations_webcam = face_recognition.face_locations(rgb_frame)
    face_encodings_webcam = face_recognition.face_encodings(rgb_frame, face_locations_webcam)
    for (top, right, bottom, left), face_encoding in zip(face_locations_webcam, face_encodings_webcam):
        matches = face_recognition.compare_faces(face_encodings, face_encoding)
        name = "Unknown"
        face_distances_webcam = face_recognition.face_distance(face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances_webcam)
        face_distances_webcam = face_distances_webcam.tolist()

        min_distance_idx = -1
        if len(face_distances_webcam) != 0:
            min_distance = 1

            for i in range(len(face_distances_webcam)):
                if face_distances_webcam[i] < 0.5 and face_distances_webcam[i] < min_distance:
                    min_distance = face_distances_webcam[i]
                    min_distance_idx = i
        if min_distance_idx != -1:
            name = face_names[min_distance_idx]

        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
    cv2.imshow("Press 'q' to quit", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
video_capture.release()
cv2.destroyAllWindows()




