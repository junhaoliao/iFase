import base64
import json
import os.path
import threading
from io import BytesIO

import face_recognition
from flask import Flask, request

faces_path = 'faces'

app = Flask(__name__)


@app.route('/image', methods=['POST'])
def upload_image():
    img_file = request.files['img']

    image = face_recognition.load_image_file(img_file)
    face_locations = face_recognition.face_locations(image)

    return json.dumps(face_locations)

@app.route('/face', methods=['PUT'])
def upload_face():
    face_key = request.json['faceKey']
    face_img = request.json['faceImg'].split(',')[1]
    face_name = request.json['faceName']

    face_file_path = os.path.join(faces_path, f'{face_key}_{face_name}.png')
    with open(face_file_path, 'wb') as face_file:
        image_bytes = base64.b64decode(face_img)
        face_file.write(image_bytes)

    return 'success'

recon_lock = threading.Lock()

@app.route('/recon_name', methods=['POST'])
def recon_name():
    face_img = request.json['faceImg'].split(',')[1]

    with recon_lock:
        face_names = []
        face_encodings = []
        for f in os.listdir(faces_path):
            name = f.split('_')[1].split('.')[0]
            face_names.append(name)

            face_file_path = os.path.join(faces_path, f)
            known_image = face_recognition.load_image_file(face_file_path)
            known_encoding = face_recognition.face_encodings(known_image)[0]

            face_encodings.append(known_encoding)

        image_bytes = base64.b64decode(face_img)
        face_obj = BytesIO(image_bytes)
        face_image = face_recognition.load_image_file(face_obj)
        face_encoding = face_recognition.face_encodings(face_image)[0]

        distances = face_recognition.face_distance(face_encodings, face_encoding)

    distances = distances.tolist()

    if len(distances) != 0:
        return face_names[distances.index(min(distances))]

    return '?'

app.run()
