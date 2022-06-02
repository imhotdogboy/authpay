import React, { useState } from 'react';
import './App.scss';
import FileUpload from './FileUpload/FileUpload';

function App() {
  const [files, setFiles] = useState([{
    name: 'myFile.jpg'
  }])

  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }

  return (
    <div className="App">
      <p className="title">Authpay</p>
      <FileUpload files={files} setFiles={setFiles} removeFile={removeFile} />
    </div>
  );
}

export default App;
