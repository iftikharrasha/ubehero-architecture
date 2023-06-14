import React, { useEffect, useState } from "react";
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import ubehero from "../../../images/ubehero-dark.svg";
import { Link } from "react-router-dom";

const Navbar = ({socketN, isConnected, userId}) => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(!visible);
    };

    // If you do not want to auto-close the mobile drawer when a path is selected
    // Delete or comment out the code block below
    // From here
    let { pathname: location } = useLocation();
    useEffect(() => {
        setVisible(false);
    }, [location]);
    // Upto here

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo">
            <Link className='h5 text-dark text-decoration-none' to='/'>
              <img src={ubehero} className='img-fluid' alt="ubehero" />
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="leftMenu">
              <LeftMenu mode={"horizontal"} />
            </div>
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <div className="rightMenu">
              <RightMenu
                socketN={socketN} 
                isConnected={isConnected}
                userId={userId} 
                mode={"horizontal"}
              />
            </div>

            <Drawer
              title={"UBEHERO"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={"inline"} />
              <RightMenu 
                socketN={socketN} 
                isConnected={isConnected}
                userId={userId} 
                mode={"inline"}
              />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
