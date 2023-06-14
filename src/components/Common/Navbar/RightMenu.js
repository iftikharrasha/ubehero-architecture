import React from "react";
import { Menu, Avatar, Switch, Row, Select, Space } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { setDarkMode } from "../../../redux/slices/mySiteSettingsSlice";
import { changeRegion } from "../../../redux/slices/staticSlice";
import { Link } from "react-router-dom";
import WishList from "../../../pages/Common/WishList";
import WalletPopUp from "../WalletPopUp/WalletPopUp";
import Notification from "../Notification/Notification";
import InboxThread from "../InboxThread/InboxThread";

const RightMenu = ({ socketN, isConnected, userId, mode }) => {
    console.log("RightMenu", socketN, isConnected, userId, mode)
    const dispatch = useDispatch();
    const history = useHistory();
    const { loggedInUser, handlelogOut } = useAuth();
    const isDarkMode = useSelector(state => state.mySiteSettings.darkMode);

    const handleClick = (checked) => {
        console.log(`switch to ${checked}`);
        dispatch(setDarkMode(!isDarkMode))
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        dispatch(changeRegion(value));
    };

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
                                </> : <p>H1</p>
                            }

                            <WalletPopUp userId={userId}/>

                            <WishList/>

                            <Menu mode={mode}>
                                <Menu.SubMenu
                                    title={
                                    <>
                                        <Avatar icon={<UserOutlined />} />
                                        <span className="username">John Doe</span>
                                    </>
                                    }
                                >
                                    <Menu.Item key="profile">
                                        <Link to={`/profile/${loggedInUser.id}`}>
                                            <UserOutlined /> {loggedInUser.name}
                                        </Link>
                                    </Menu.Item>
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

                        ) : null
                    }
                    <div>
                        <Switch
                            checkedChildren={<i class="fa fa-moon-o" aria-hidden="true"></i>}
                            unCheckedChildren={<i class="fa fa-sun-o" aria-hidden="true"></i>}
                            onChange={handleClick} 
                            defaultChecked
                        />
                    </div>
                    <Select
                        defaultValue="eng"
                        style={{
                            width: 70,
                        }}
                        onChange={handleChange}
                        size="small"
                        placeholder="REGION"
                        options={[
                            {
                                value: 'uk',
                                label: 'UK',
                            },
                            {
                                value: 'bd',
                                label: 'BD',
                            },
                            {
                                value: 'ksa',
                                label: 'KSA',
                            },
                        ]}
                    />
                </Space>
            </Row>
    );
};

export default RightMenu;
