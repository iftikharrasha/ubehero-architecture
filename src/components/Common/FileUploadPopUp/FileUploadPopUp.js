import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const FileUploadPopUp = ({show, handleClose, previewURL, selectedFile, handleFileSelect, handleTournamentImageUploadToS3, picProgress, errorMessage}) => {
    return (
        <Modal show={show} onHide={handleClose} id="staticBackdrop" data-mdb-backdrop="static" data-mdb-keyboard="false" tabindex="-1" className='popupModal fade' aria-labelledby="staticBackdropLabel" aria-hidden="true" centered>
            <Modal.Body>
                <section>
                    <div className="container">
                        <div className="text-black" style={{borderRadius: "15px"}}>
                            {
                                previewURL && 
                                <div className="flex-shrink-0 mt-3">
                                    <h6 className="form-label h6" for="customFile">Preview thumbnail</h6>
                                    <img src={previewURL}
                                    alt="placeholder" className="img-fluid w-100"/>
                                </div>
                            }

                            {/* {
                                picProgress > 0 ?
                                <div className="progress" style={{height: `20px`}}>
                                    <div className="progress-bar" role="progressbar" style={{width: `${picProgress}%`}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">{picProgress}</div>
                                </div> : null
                            } */}

                            <div className='my-3'>
                                <label className="form-label" for="customFile">Update tournament thumbnail</label>
                                <br />
                                <input type="file" className="form-control" id="customFile" onChange={handleFileSelect}/>
                            </div>

                            <div className='mb-3'>
                                {
                                    picProgress > 0 ? 
                                    <button className="btn btn-primary" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        UPLOADING...
                                    </button> : 
                                    <button className="btn btn-primary" type="button" disabled={!selectedFile} onClick={handleTournamentImageUploadToS3}>
                                        UPLOAD
                                    </button>
                                }
                            </div>

                            {
                                errorMessage ? <p className="text-danger text-center">{errorMessage}</p> : null
                            }
                        </div>
                    </div>
                </section>
            </Modal.Body>
        </Modal>
    );
};

export default FileUploadPopUp;