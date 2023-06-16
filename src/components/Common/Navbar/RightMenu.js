import React from "react";
import { Menu, Avatar, Row, Space, Button } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import WishList from "../../../pages/Common/WishList";
import WalletPopUp from "../WalletPopUp/WalletPopUp";
import Notification from "../Notification/Notification";
import InboxThread from "../InboxThread/InboxThread";
import useProfile from "../../../hooks/useProfile";

const RightMenu = ({ socketN, isConnected, userId, mode }) => {
    const history = useHistory();
    const { loggedInUser, handlelogOut } = useAuth();
    const { handleSwitchProfile, actingAs } = useProfile();

    return (
            <Row justify="center" align="middle">
                <Space wrap>
                    {
                        loggedInUser.isSignedIn ? (
                        <>
                            {
                                socketN ? 
                                <>
                                    <Notification 
                                        socketN={socketN} 
                                        isConnected={isConnected}
                                        userId={userId}
                                    /> 
                                    <InboxThread 
                                        socketN={socketN} 
                                    /> 
                                </> : null
                            }

                            <WalletPopUp userId={userId}/>

                            <WishList/>

                            <Menu mode={mode}>
                                <Menu.SubMenu
                                    title={
                                    <>
                                        {loggedInUser.photo ? <Avatar src={loggedInUser.photo}/> : <Avatar icon={<UserOutlined />} />}
                                        <span className="username">John Doe</span>
                                    </>
                                    }
                                >
                                    <Menu.Item key="profile">
                                        <Link to={`/profile/${loggedInUser.id}`}>
                                            <UserOutlined /> {loggedInUser.name}
                                        </Link>
                                    </Menu.Item>
                                    {
                                        loggedInUser.permissions.includes("admin") ? 
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
                                        loggedInUser.permissions.includes("master") ? 
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
                                        <Link to={`/profile/${loggedInUser.id}/settings`}>
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
