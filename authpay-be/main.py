from fastapi import FastAPI, File, UploadFile
from typing import List
from BankNotes import BankNote
from imgcrop import imgcrop
from PIL import Image

import uvicorn
import os
import pickle
#import pandas as pd
#import numpy as np

app = FastAPI()
pickle_in = open("classifier.pkl","rb")
classifier=pickle.load(pickle_in)

@app.route('/helath')
async def helath_check():
    return "GOOD"

@app.get("/")
def read_root():
  return { "Hello": "World" }

@app.post("/files/")
async def create_files(files: List[bytes] = File(...)):
    return {"file_sizes": [len(file) for file in files]}

@app.post("/uploadfiles")
async def create_upload_files(files: List[UploadFile] = File(...)):
    UPLOAD_DIRECTORY = "./"
    for file in files:
        contents = await file.read()
        with open(os.path.join(UPLOAD_DIRECTORY, file.filename), "wb") as fp:
            fp.write(contents)
        print(file.filename)
    return {"filenames": [file.filename for file in files]}

@app.post('/predict')
def predict_banknote(data:BankNote):
    data = data.dict()
    variance=data['variance']
    skewness=data['skewness']
    curtosis=data['curtosis']
    entropy=data['entropy']
    prediction = classifier.predict([[variance,skewness,curtosis,entropy]])
    if(prediction[0]>0.5):
        prediction="Fake note"
    else:
        prediction="Its a Bank note"
    return {
        'prediction': prediction
    }

@app.post('/crop')
def crop_img(data:imgcrop):
    data = data.dict()
    crop_id = data['img_id']
    original_img = Image.open(crop_id)
    cropped_img = original_img.crop((10,10,100,100))
    return {original_img.size, cropped_img.size}

if __name__ == '__main__':
    uvicorn.run(app, host = '127.0.0.1', port = 8000)