import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Row, Avatar, Modal, Card, Space, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';
import PartyComments from './PartyComments';
import useParties from '../../../hooks/useParties';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const { Meta } = Card;
const { TextArea } = Input;

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
);

const PartyWritePost = ({ id, open, setOpen }) => {
    const { handleGetPartySocialPostComments } = useParties();
    const [updateData, setUpdateData] = useState({ title: null, description: null, thumbnail: null });
    const [comment, setComment] = useState('');
    const token = localStorage.getItem('jwt');

    
    const editorRef = useRef(null);
    const sizeLimit = 1200;
    const [ len, setLen ] = useState(0);
    const [ data, setData ] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const onChange = (e) => {
        setUpdateData({
            ...updateData,
            title: e.target.value,
        })
    };

    const handleEditorInit = (evt, editor) => {
        editorRef.current = editor;
        setLen(editor.getContent({ format: 'text' }).length);
    };

    const handleRulesEditor = (value, editor) => {
        const length = editor.getContent({ format: 'text' }).length;
        if (length <= sizeLimit) {
            setData(value);
            setLen(length);
            if (editorRef.current) {
                const sanitizedHTML = DOMPurify.sanitize(editorRef.current.getContent());
                setUpdateData({
                    ...updateData,
                    description: sanitizedHTML,
                })
            }
        }
    };

    const props = {
        action: `${process.env.REACT_APP_API_LINK}/api/v1/upload/${id}`,
        headers: {
            contentType: 'multipart/form-data',
            authorization: 'Bearer ' + token,
        },
        listType: 'picture',
        multiple: false,
        beforeUpload: (file) => {
            const isAcceptedType  = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif';
            const isAcceptedSize = file.size / 1024 <= 300; // Convert bytes to KB
            if (!isAcceptedType ) {
                message.error(`${file.name} file not accepted`);
            } else if (!isAcceptedSize) {
                message.error(`${file.name} file size exceeds 300KB limit`);
            }
            return (isAcceptedType && isAcceptedSize) || Upload.LIST_IGNORE;
        },
        onChange: async (info) => {
            setUpdateData({
                ...updateData,
                thumbnail: info.file.originFileObj,
            })
            
            if (info.file.status === 'done' && info.file.originFileObj) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    setPreviewImage(fileReader.result);
                };
                fileReader.readAsDataURL(info.file.originFileObj);
            } else {
                setPreviewImage(null);
            }
        },
    };

    const handleOk = async () => {
        console.log(updateData)
        setConfirmLoading(true);
        const path = 'parties';

        const formData = new FormData();
        formData.append("file", updateData.thumbnail);
        formData.append("title", updateData.title);
        formData.append("desc", updateData.description);
        console.log(formData)

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_LINK}/api/v1/upload/partypost/${id}?path=${path}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: " Bearer " + token,
                },
            });
            if(response.data.status === 200){
                setData('');
                setLen(0);
                setPreviewImage(null)
                setConfirmLoading(false)
                setUpdateData({
                    ...updateData,
                    title: null,
                    description: null,
                    thumbnail: null,
                })
                setOpen(false);
                window.location.reload();
            }else{
                setConfirmLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            title={<h4 className='text-center pb-3'>Write your gaming blog post here</h4>}
            centered
            open={open}
            okText='POST'
            onOk={handleOk}
            onCancel={() => setOpen(false)}
            confirmLoading={confirmLoading}
            width={700}
            okButtonProps={{
                disabled: !updateData.title || !updateData.description,
            }}
        >
            <Row gutter={[16, 16]}>
                <Card
                    style={{
                        width: '100%',
                    }}
                    cover={ !previewImage ? null :
                        <img style={{ width: '100%' }}
                            alt="example"
                            src={previewImage}
                        />
                    }
                    actions={
                        [
                            <Upload {...props}>
                                {
                                    previewImage ? null :
                                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                                }
                            </Upload>
                        ]
                     }
                >
                    <TextArea className='mb-4' showCount maxLength={100} value={updateData?.title} onChange={onChange} placeholder="Drop a caption.." />
                    <Editor
                        disabled={false}
                        value={data}
                        apiKey='4gad6j3ed6y4mo6qj63bpjzc9jpn5axhle3lqxfhcihk7n6j'
                        onEditorChange={handleRulesEditor}
                        onInit={handleEditorInit}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'fullscreen'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </Card>
            </Row>
        </Modal>
    );
};

export default PartyWritePost;
