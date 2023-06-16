import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="tournaments">
        <Link to='/'>
          Tournaments
        </Link>
      </Menu.Item>
      <Menu.Item key="games">
        <Link to='/games'>
          Games
        </Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link to='/about'>
          About Us
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
