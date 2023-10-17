import React from "react";
import { Menu, Avatar, Row, Space, Button, Progress, Card } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import WalletPopUp from "../WalletPopUp/WalletPopUp";
import Notification from "../Notification/Notification";
import InboxThread from "../InboxThread/InboxThread";
import useProfile from "../../../hooks/useProfile";
import WishList from "../../Profile/WishList";

const { Meta } = Card;

const RightMenu = ({ profile, socketN, isConnected, mode }) => {
    const now = Math.ceil(((profile?.data?.stats?.currentXP / (profile?.data?.stats?.currentXP  + profile?.data?.stats?.nextLevelRequiredXP)) * 100));
    const history = useHistory();
    const { handlelogOut } = useAuth();
    const { handleSwitchProfile } = useProfile();
    const role = profile.role;

    return (
            <Row justify="center" align="middle">
                <Space wrap>
                    {
                        profile?.signed_in ? (
                        <>
                            {
                                socketN ? 
                                <>
                                    <Notification 
                                        socketN={socketN} 
                                        isConnected={isConnected}
                                        userId={profile?.data?._id}
                                    /> 
                                    <InboxThread 
                                        socketN={socketN} 
                                    /> 
                                </> : null
                            }

                            <WalletPopUp userId={profile?.data?._id} userName={profile?.data?.userName}/>

                            <WishList/>

                            <Menu mode={mode}>
                                <Menu.SubMenu
                                    title={
                                    <>
                                        {profile?.data?.photo ? <Avatar src={profile?.data?.photo}/> : <Avatar icon={<UserOutlined />} />}
                                        <span className="username">John Doe</span>
                                    </>
                                    }
                                >
                                    <Menu.Item key="profile" className="xpTop">
                                        <Link to={`/profile/${profile?.data?._id}/badges`}>
                                            <Card hoverable>
                                                <Meta
                                                    avatar={
                                                        <Avatar src="https://props.com/wp-content/uploads/Underdog-Fantasy-Icon-100x100.webp" size="small"/>
                                                    }
                                                    title={null}
                                                    description={
                                                        <>
                                                            <p className='card-text text-capital' style={{fontSize: '14px'}}>{profile?.data?.stats?.levelTitle}</p>
                                                        </>
                                                    }
                                                />
                                                <Progress percent={100} size='small'/>
                                                {/* <p className="text-center">Total XP: 230</p> */}
                                            </Card>
                                        </Link>
                                    </Menu.Item>

                                    <Menu.Item key="profile">
                                        <Link to={`/profile/${profile?.data?._id}`}>
                                            <UserOutlined /> {profile?.data?.userName}
                                        </Link>
                                    </Menu.Item>
                                    {
                                        role === "admin" ? 
                                        <Menu.SubMenu key="switch" title="Switch Profile">
                                            <Menu.Item key="user" onClick={(e) => handleSwitchProfile(e, "user")}>
                                                Gamer Profile
                                            </Menu.Item>
                                            <Menu.Item key="master" onClick={(e) => handleSwitchProfile(e, "master")}>
                                                Master Profile
                                            </Menu.Item>
                                            <Menu.Item key="admin" onClick={(e) => handleSwitchProfile(e, "admin")}>
                                                Admin Profile
                                            </Menu.Item>
                                        </Menu.SubMenu>
                                        :
                                        role === "master" ? 
                                        <Menu.SubMenu key="switch" title="Switch Profile">
                                            <Menu.Item key="user" onClick={(e) => handleSwitchProfile(e, "user")}>
                                                Gamer Profile
                                            </Menu.Item>
                                            <Menu.Item key="master" onClick={(e) => handleSwitchProfile(e, "master")}>
                                                Master Profile
                                            </Menu.Item>
                                        </Menu.SubMenu>
                                        :  null
                                    }
                                    <Menu.Item key="settings">
                                        <Link to={`/profile/${profile?.data?._id}/settings`}>
                                            <SettingOutlined /> Settings
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="log-out" onClick={() => handlelogOut(history)}>
                                        <LogoutOutlined /> Logout
                                    </Menu.Item>
                                </Menu.SubMenu>
                            </Menu>
                        </>
                        ) : 
                        <Button>
                            <Link to="/login">
                                Login
                            </Link>
                        </Button>
                    }
                </Space>
            </Row>
    );
};

export default RightMenu;
