import React, { useEffect, useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { useLocation } from "react-router-dom";
import ubehero from "../../../images/ubehero-dark.svg";
import { Link } from "react-router-dom";

import { Layout, Button, Drawer, FloatButton, Switch  } from "antd";
import { MenuOutlined, CheckOutlined, FlagOutlined, BorderInnerOutlined, StopOutlined, HeatMapOutlined } from "@ant-design/icons";
import { setDarkMode } from "../../../redux/slices/mySiteSettingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeRegion } from "../../../redux/slices/staticSlice";

const Navbar = ({socketN, isConnected, profile}) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.mySiteSettings.darkMode);
  const countrySelected = useSelector(state => state.statics.country);
  const [selectedRegion, setSelectedRegion] = useState(countrySelected);

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
    // Upto here\

    const [floatButtonVisible, setFloatButtonVisible] = useState(false);

    const handleThemeChange = (checked) => {
        console.log(`switch to ${checked}`);
        dispatch(setDarkMode(!isDarkMode))
    };

    const handleRegionChange = (value) => {
        console.log(`selected ${value}`);
        setSelectedRegion(value);
        setFloatButtonVisible(!floatButtonVisible);
        dispatch(changeRegion(value));
    };

    const getButtonIcon = (region) => {
      return selectedRegion === region ? getActiveIcon(region) : getDefaultIcon(region);
    };

    const getActiveIcon = (region) => {
      // Return the active icon for the clicked region
      // Replace this with the appropriate active icon component
      if (region === 'bd') return <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/bd.svg" alt="bd"/>;
      if (region === 'uk') return <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/gb.svg" alt="uk"/>;
      if (region === 'ksa') return <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/sa.svg" alt="ksa"/>;
      return null;
    };
  
    const getDefaultIcon = (region) => {
      // Return the default icon for the region
      // Replace this with the appropriate default icon component
      if (region === 'bd') return <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/bd.svg" alt="bd"/>;
      if (region === 'uk') return <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/gb.svg" alt="uk"/>;
      if (region === 'ksa') return <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/sa.svg" alt="ksa"/>;
      return null;
    };

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo">
            <Link to='/'>
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
                profile={profile}
                socketN={socketN} 
                isConnected={isConnected}
                mode={"horizontal"}
              />
            </div>

            <Drawer
              title={
                <Link to='/'>
                  <img src={ubehero} className='img-fluid' alt="ubehero" />
                </Link>
              }
              placement="right"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={"inline"} />
              <RightMenu 
                profile={profile}
                socketN={socketN} 
                isConnected={isConnected}
                mode={"inline"}
              />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
      
      <FloatButton.Group
        trigger="click"
        style={{
          left: '3rem',
          bottom: '2rem',
        }}
        icon={getButtonIcon(selectedRegion)}
        open={floatButtonVisible}
        onOpenChange={(open) => {
          setFloatButtonVisible(open);
        }}
      >
        <FloatButton
          // description="BD"
          tooltip="Change region to BD"
          onClick={() => handleRegionChange('bd')}
          active={selectedRegion === 'bd'}
          icon={getButtonIcon('bd')}
        />
        <FloatButton
          // description="UK"
          tooltip="Change region to UK"
          onClick={() => handleRegionChange('uk')}
          active={selectedRegion === 'uk'}
          icon={getButtonIcon('uk')}
        />
        <FloatButton
          // description="KSA"
          tooltip="Change region to KSA"
          onClick={() => handleRegionChange('ksa')}
          active={selectedRegion === 'ksa'}
          icon={getButtonIcon('ksa')}
        />
      </FloatButton.Group>

      <div style={{ position: 'fixed', bottom: '2.5rem', left: '6.5rem' }}>
        <Switch
            checkedChildren={<i className="fa fa-moon-o" aria-hidden="true"></i>}
            unCheckedChildren={<i className="fa fa-sun-o" aria-hidden="true"></i>}
            onChange={handleThemeChange} 
            defaultChecked
        />
      </div>
    </nav>
  );
};

export default Navbar;
