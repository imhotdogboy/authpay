import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

const App = () => {
  let formData = new FormData();

  const onFileChange = (e) => {
    console.log(e.target.files[0])
    if(e.target && e.target.files[0]) {
      formData.append('files', e.target.files[0]);
    }
  }

  const SubmitFileData = () => {
    Axios.post(
      'http://127.0.0.1:8000/uploadfiles',
      formData, {headers: {'Content-Type': 'multipart/form-data'}}
    )
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <div className="App">
      <div>
        <input type="file" name="file_upload" onChange={onFileChange}/>
      </div>
      <div>
        <button onClick={SubmitFileData}>파일 업로드</button>
      </div>
    </div>
  );
}

export default App;
