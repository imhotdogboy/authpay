import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Axios from 'axios';
import './FileUpload.scss'

const FileUpload = ({files, setFiles, removeFile}) => {
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        file.isUploading = true;
        setFiles([...files, file])

        const formData = new FormData();
        formData.append(
            file.name,
            file,
            file.name
        )

        Axios.post(
            'http://127.0.0.1:8000/uploadfiles',
            formData, {headers: {'Content-Type': 'multipart/form-data'}}
        )
        .then(res => {
            file.isUploading = false;
            setFiles([...files, file])
        })
        .catch(error => {
            console.error(error)
            removeFile(file.name)
        })
    }

    return (
        <div className="file-card">
            <div className="file-inputs">
                <input type="file" onChange={uploadHandler}/>
                <button>
                    <i>
                        <FontAwesomeIcon icon={faPlus} />
                    </i>
                    Upload
                </button>
            </div>

            <p className="main">파일 형식</p>
            <p className="info">MP4, JPG, PNG</p>
        </div>
    )
}

export default FileUpload
