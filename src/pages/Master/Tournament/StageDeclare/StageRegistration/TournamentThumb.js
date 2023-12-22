import React, { useState } from 'react';
import { Row, Col, Steps, Card } from "antd";
import Form from 'react-bootstrap/Form';
import FileUploadPopUp from "../../../../../components/Common/FileUploadPopUp/FileUploadPopUp";
import axios from 'axios';

const TournamentThumb = ({tId, updatedTournament, setUpdatedTournament, previewURL, setPreviewURL, errorMessage, setErrorMessage}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setErrorMessage(null);
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };

    const handleFileSelect = (event) => {
        setErrorMessage(null);
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewURL(URL.createObjectURL(file));
    };
    
    const [picProgress, setPicProgress] = useState(0);
    const handleTournamentImageUploadToS3 = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
    
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/upload/${tId}`, formData, {
                    // headers: {
                    //     "Content-Type": "multipart/form-data",
                    //     Authorization: " Bearer " + token,
                    // },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        );
                        setPicProgress(percentCompleted);
                    },
                });
                if(response.data.status === 200){
                    setPicProgress(0);
                    setSelectedFile(null)
                    setPreviewURL(response.data.data.imageUrl)
                    handleClose();
                    return setUpdatedTournament({
                        ...updatedTournament, 
                        tournamentThumbnail: response.data.data.imageUrl
                    });
                }else{
                    setPicProgress(0);
                    setSelectedFile(null)
                    setPreviewURL(updatedTournament.tournamentThumbnail)
                    setErrorMessage(response.data.error.message);
                }
            } catch (error) {
                // Handle error
                console.log(error);
            }
        }
    };
    
    return (
       <>
        <Row gutter={[16, 16]} className="pt-3">
            <Col span={16}>
                <Form.Group className="mb-3" controlId="formBasicRound">
                    {
                        !previewURL ? 
                        <section className="p-4 d-flex justify-content-center align-items-center w-75 mx-auto border border-warning mb-5 rounded  file-upload file-upload-blank" onClick={handleShow}>
                            <div className="file-upload-message text-center text-red">
                                <i className="fas fa-cloud-upload-alt file-upload-cloud-icon"></i>
                                <p className="file-upload-default-message">Click here to upload a file</p>
                            </div>
                        </section>
                        :
                        <section className="p-4 d-flex justify-content-center align-items-center w-75 mx-auto border border-warning file-upload file-uploaded mb-5 rounded" style={{backgroundImage: `url(${updatedTournament.tournamentThumbnail})`}} onClick={handleShow}>
                            <div className="file-upload-message text-center">
                                <i className="fas fa-cloud-upload-alt file-upload-cloud-icon"></i>
                                <p className="file-upload-default-message">Click here to change thumbnail</p>
                            </div>
                        </section>
                    }
                </Form.Group>
            </Col>
            <Col span={8}>
                <Steps
                    progressDot
                    current={1}
                    direction="vertical"
                    items={[
                        {
                        title: `Tips`,
                        description: 
                            <Card bordered>
                                <div>Good thumbnail should include</div>
                                <ul>
                                    <li>relevant to the games you're hosting</li>
                                    <li>sharp and not blurry images</li>
                                    <li>375×224 Pixel dimentions</li>
                                    <li>At highest 1mb png, jpg or webp file</li>
                                </ul>
                                <div className="mt-3">Bad thumbnails may contain</div>
                                <ul>
                                    <li>overly bright colors and &ldquo;hypnotic&rdquo; backgrounds</li>
                                    <li>explicit, vulgar or inappropriate images</li>
                                    <li>your personal contact informations</li>
                                </ul>
                            </Card>
                        },
                        {
                            title: '',
                            description: '',
                        },
                    ]}
                />
            </Col>
        </Row>
                
        {/* popup for user profile */}
        <FileUploadPopUp show={show} handleClose={handleClose} previewURL={previewURL} selectedFile={selectedFile} handleFileSelect={handleFileSelect} handleTournamentImageUploadToS3={handleTournamentImageUploadToS3} picProgress={picProgress} errorMessage={errorMessage}/>
       </>
    );
};

export default TournamentThumb;