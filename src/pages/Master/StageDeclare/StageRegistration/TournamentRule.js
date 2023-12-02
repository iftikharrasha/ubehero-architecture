import React, { useRef, useState } from "react";
import { Alert, Row, Col, Steps, Card } from "antd";
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify from 'dompurify';

const TournamentRule = ({updatedTournament, setUpdatedTournament}) => {
    const editorRef = useRef(null);
    const sizeLimit = 1200;
    const [ len, setLen ] = useState(0);
    const [ data, setData ] = useState(updatedTournament.settings.tournamentRules);

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
                setUpdatedTournament({
                    ...updatedTournament, 
                    settings: {
                        ...updatedTournament.settings,
                        tournamentRules: sanitizedHTML,
                    },
                })
            }
        }else{
            setLen(length);
        }
    };

    return (              
        <Row gutter={[16, 16]} className="pt-3">
            <Col span={16}>
                <Editor
                    disabled={false}
                    value={data}
                    apiKey='4gad6j3ed6y4mo6qj63bpjzc9jpn5axhle3lqxfhcihk7n6j'
                    onEditorChange={handleRulesEditor}
                    onInit={handleEditorInit}
                    init={{
                        height: 400,
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
                            <>
                                <Card bordered>
                                    <div>Good rules should include</div>
                                    <ul>
                                        <li>relevant to the games you're hosting</li>
                                        <li>sharp bulletpoints</li>
                                        <li>legible if they contain text</li>
                                        <li>free of grammar and spelling mistakes</li>
                                    </ul>
                                    <div className="mt-3">Bad rules may contain</div>
                                    <ul>
                                        <li>overly bright colors and &ldquo;hypnotic&rdquo; texts</li>
                                        <li>explicit texts depicting alcohol, sex, smoking, weapons, violence, etc.</li>
                                        <li>vulgar or inappropriate language</li>
                                    </ul>
                                </Card>
                                <Alert type={len >= sizeLimit ? "error" : "success"} message={`Remaining characters: ${sizeLimit - len}`} banner className="mt-3"/>
                            </>,
                        },
                        {
                            title: '',
                            description: '',
                        },
                    ]}
                />
            </Col>
        </Row>
    );
};

export default TournamentRule;