import { useState } from 'react'
import './App.css';
import FileUpload from './FileUpload/FileUpload';

function App() {
  const [files, setFiles] = useState([{
    name: 'myFile.jpg'
  }])

  return (
    <div className="App">
      <p className="title">Authpay</p>
      <FileUpload files={files} setFiles={setFiles} />
    </div>
  );
}

export default App;
