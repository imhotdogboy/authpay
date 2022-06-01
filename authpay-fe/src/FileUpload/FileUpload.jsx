import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './FileUpload.scss'

const FileUpload = ({files, setFiles}) => {
    const uploadHandler = () => {}
    return (
        <div className="file-card">
            <div className="file-inputs">
                <input type="file" />
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
