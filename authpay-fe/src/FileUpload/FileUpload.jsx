import React, { useRef, useState } from 'react';
import Axios from 'axios';
import './FileUpload.css';

import { ImageConfig } from '../ImageConfig';
import uploadImage from '../assets/cloud-upload-regular-240.png';

const FileUpload = ({files, setFiles, removeFile}) => {
    const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);

            const file = event.target.files[0];
            file.isUploading = true;
            setFiles([...files, file])

            const formData = new FormData();
            formData.append('files', file);

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
    }

    return (
        <div>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input-label">
                    <image src={uploadImage} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop} />
            </div> {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview-title">Upload Complete</p> {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview-item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview-item-info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    );
}

export default FileUpload
