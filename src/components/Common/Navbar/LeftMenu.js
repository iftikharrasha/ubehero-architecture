import React from "react";
import { Badge, Menu } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="live">
        <Badge dot offset={[7, 4]}>
          <Link to='/Live' style={{color: '#ffffff'}}>
            Live
          </Link>
        </Badge>
      </Menu.Item>
      <Menu.Item key="games">
        <Link to='/games'>
          Games
        </Link>
      </Menu.Item>
      <Menu.Item key="contact">
        <Link to='/contact'>
          Contact
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
