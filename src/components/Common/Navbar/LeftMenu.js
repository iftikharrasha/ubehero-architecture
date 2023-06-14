import React from "react";
import { Menu } from "antd";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="tournaments">Tournaments</Menu.Item>
      <Menu.Item key="games">Games</Menu.Item>
      <Menu.Item key="about">About Us</Menu.Item>
      <Menu.Item key="connect">Contact Us</Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
