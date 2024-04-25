import React from 'react';
import { Row, Tabs } from 'antd';
import { HistoryOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import PartyEvents from './PartyEvents';
import { useSelector } from 'react-redux';
import PartyPeople from './PartyPeople';
import PartyTimeline from './PartyTimeline';

const { TabPane } = Tabs;

const PartyBottom = ({ id, party }) => {
    const profile = useSelector(state => state.profile);
    const isLoggedIn = profile?.signed_in;
    const userId = profile?.data?._id;

    return (
        <Tabs>
            <TabPane
                key="mystats"
                tab={
                    <Row justify="left" align="middle">
                        <HistoryOutlined /> <span>Timeline</span>
                    </Row>
                }
            >
                <PartyTimeline unlocked={party?.unlocked} id={id} userId={userId} isLoggedIn={isLoggedIn}/>
            </TabPane>
            <TabPane
                key="events"
                tab={
                    <Row justify="left" align="middle">
                        <TeamOutlined /> <span>Events</span>
                    </Row>
                }
            >
                <PartyEvents party={party}/>
            </TabPane>

            {
                !isLoggedIn ? null :
                <TabPane
                    key="people"
                    tab={
                        <Row justify="left" align="middle">
                            <SettingOutlined /> <span>People</span>
                        </Row>
                    }
                >
                    <PartyPeople pId={party._id} owner={party?.owner?._id === userId }/>
                </TabPane>
            }

            {
                !isLoggedIn ? null : party?.owner?._id !== userId ? null :
                <TabPane
                    key="inventory"
                    tab={
                        <Row justify="left" align="middle">
                            <SettingOutlined /> <span>Inventory</span>
                        </Row>
                    }
                >
                    {/* <Settings profile={profile} settingsRouteKey={settingsRouteKey} handleTabChange={handleTabChange}/> */}
                </TabPane>
            }
        </Tabs>
    );
};

export default PartyBottom;