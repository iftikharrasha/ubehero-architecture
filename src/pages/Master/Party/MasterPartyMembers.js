import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Preloader from "../../../components/PageLayout/Preloader";
import useParties from "../../../hooks/useParties";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Button, Col, Divider, Modal, Row, Space, Tag } from "antd";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from "react-router-dom";

const MasterPartyMembers = ({routeKey, onChangeTab}) => {
    const { id, pId } = useParams();

    const [partyDetails, setPartyDetails] = useState(null);
    const { handlePartyPeopleListHook, handlePartyJoinApprove } = useParties();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [answer, setAnswer] = useState("");
    const [requestedMember, setRequestedMember] = useState("");
    console.log(partyDetails)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const details = await handlePartyPeopleListHook(pId);
            setPartyDetails(details);
          } catch (error) {
            setPartyDetails([]);
            console.error('Error fetching friend list:', error);
          }
        };
      
        fetchData();  // Call the async function immediately
    }, []);

    const handleOk = async (type) => {
        setConfirmLoading(true);
        const result = await handlePartyJoinApprove(pId, type, requestedMember);
        if(result.success){
            setOpen(false);
            setConfirmLoading(false);
            window.location.reload();
        }
    };

    const handleRequest = async (e, member) => {
        e.preventDefault();
        const ans = partyDetails?.answers?.find(ansr => ansr.uId === member._id);
        setAnswer(ans?.answers);
        setRequestedMember(member);
        setOpen(true)
    }

    return (
        <div className="container pt-4">
            <Divider orientation="right">
                <Space>
                    <Link to={`/master/${id}/parties`}>
                        <Button type="default">
                            Go Back
                        </Button>
                    </Link>
                </Space>
            </Divider>
            <section className="mb-4">
                <Tabs
                    id="controlled-tab-example"
                    className="mb-3"
                    defaultActiveKey={routeKey}
                    onChange={onChangeTab}
                >
                    <Tab eventKey="requests" title="Requests">
                        <div className="card">
                            <div className="card-header text-center py-3">
                                <h5 className="mb-0 text-center">
                                    <strong>Member requests of - {partyDetails?.title}</strong>
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover text-nowrap">
                                    <thead>
                                        <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Member Name</th>
                                        <th scope="col">Joined Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            partyDetails ? 
                                                partyDetails?.members?.requested?.length === 0 ? <p className="mt-3">No pending join request!</p> :
                                                    partyDetails?.members?.requested?.map((member, index) => (
                                                        <tr key={index}>
                                                            <th scope="row">{index+1}</th>
                                                            <td>
                                                                <img className='img-fluid' src={member?.photo} alt='tournamentThumbnail' width="25px" height="25px"/>
                                                                <span className='ms-3'>{member?.userName}</span>
                                                            </td>
                                                            <td>
                                                                <i className="fas fa-clock me-1 text-secondary"></i>
                                                                <span>{moment(member?.createdAt).local().format("LLL")}</span>
                                                            </td>
                                                            <td>
                                                            {
                                                                member.status === 'active' ? 
                                                                <Tag color="green">
                                                                    {member.status}
                                                                </Tag>
                                                                : member.status === 'blocked' ? 
                                                                <Tag color="green">
                                                                    {member.status}
                                                                </Tag>
                                                                : member.status === 'paused' ? 
                                                                <Tag color="green">
                                                                    {member.status}
                                                                </Tag>
                                                                : '-'
                                                            }
                                                            </td>
                                                            <td>
                                                                <Tag color="geekblue" style={{cursor: 'pointer'}} onClick={(e) => handleRequest(e, member)}>
                                                                    Check
                                                                </Tag>
                                                            </td>
                                                        </tr>
                                                    )) 
                                            : <Preloader />
                                        }

                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="members" title="Members">
                        {/* joined */}
                    </Tab>
                </Tabs>
            </section>

            <Modal
              title={<h4 className='text-center pb-5'>{`${partyDetails?.title} - Member Joining Verification`}</h4>}
              centered
              open={open}
              onCancel={() => setOpen(false)}
              confirmLoading={confirmLoading}
              width={1000}
              okButtonProps={{
                disabled: null,
              }}
              footer={
                <>
                    <Button type="primary" onClick={() => handleOk('approve')}>
                        Approve
                    </Button>
                    <Button type="primary" danger onClick={() => handleOk('reject')}>
                        reject
                    </Button>
                </>
              }
            >
              <Row gutter={[16, 16]}>
                {
                    partyDetails?.questions[0] !== 'NA' ?
                    <Col span={24}>
                        <div className='text-center'>
                            <p>Kindly pick whether to approve this request or reject?</p>
                        </div>
                    </Col> : 
                    partyDetails?.questions.map((ques, index) => (
                        <Col span={24} key={index}>
                            <h6>{index+1}. {ques}</h6>
                            <p>= {answer[index]}</p>
                        </Col>
                    ))
                }
              </Row>
            </Modal>
        </div>
    );
};

export default MasterPartyMembers;