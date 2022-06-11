import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload/FileUpload';

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
      <FileUpload files={files} setFiles={setFiles} removeFile={removeFile} />
    </div>
  );
}

export default App;
