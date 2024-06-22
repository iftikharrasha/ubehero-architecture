import React, { useState, useRef } from 'react';
import { Row, Modal, Card, Input } from 'antd';
import DOMPurify from 'dompurify';
import { useHistory } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import useProfile from '../../../hooks/useProfile';

const { TextArea } = Input;

const SupportPost = ({ id, open, setOpen, routeKey }) => {
    const { handleCreateSupportTicket } = useProfile();
    const [updateData, setUpdateData] = useState({ title: null, description: null });

    const history = useHistory();
    const editorRef = useRef(null);
    const sizeLimit = 1200;
    const [ len, setLen ] = useState(0);
    const [ data, setData ] = useState('');
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

    const handleOk = async () => {
        setConfirmLoading(true);

        const data = {
            issuedBy: id,
            title: updateData.title,
            desc: updateData.description,
            tag: routeKey
        }

        try {
            const response = await handleCreateSupportTicket(data);
            if(response.status === 200){
                setConfirmLoading(false)
                setOpen(false);

                const destination = `/support/${id}/ticket`;
                history.replace(destination);
                // window.location.reload();
            }else{
                setConfirmLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            title={<h4 className='text-center pb-3'>Describe your problem here</h4>}
            centered
            open={open}
            okText='SUBMIT'
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

export default SupportPost;
