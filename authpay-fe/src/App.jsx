import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import FileUpload from './FileUpload/FileUpload';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

function App() {
  const [files, setFiles] = useState([{
    name: 'myFile.jpg'
  }])

  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }

  return (
    <div className="box">
      <h2 className="header">
        Authpay
      </h2>
      <BrowserRouter>
        <Routes>
          <Route path="/upload" element={<FileUpload files={files} setFiles={setFiles} removeFile={removeFile} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
