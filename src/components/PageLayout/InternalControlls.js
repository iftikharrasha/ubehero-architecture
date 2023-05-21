import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const InternalControlls = () => {
  const profile = useSelector(state => state.profile.data);

  const [expanded, setExpanded] = useState(-1);

  const toggleExpansion = (index) => {
    if (index === expanded) {
      setExpanded(-1);
    } else {
      setExpanded(index);
    }
  };

  const masterMenus = [
    {
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt fa-fw',
      link: `/internal/${profile._id}`,
      submenu: null
    },
    {
      label: 'Tournaments',
      icon: 'fas fa-chart-bar fa-fw',
      link: null,
      submenu: [
        {
          label: 'My Tournaments',
          link: `/internal/${profile._id}/tournaments`,
        },
        {
          label: 'Create Tournament',
          link: `/internal/${profile._id}/create-tournament`,
        },
        {
          label: 'Leaderboards',
          link: `/internal/${profile._id}/leaderboards`,
        },
      ],
    },
    {
      label: 'Applications',
      icon: 'fas fa-shield fa-fw',
      link: `/internal/${profile._id}/master-applications`,
      submenu: null
    },
    {
      label: 'Analytics',
      icon: 'fas fa-chart-line fa-fw',
      link: '/internal/inner-page',
      submenu: null
    },
    {
      label: 'Results',
      icon: 'fas fa-calendar fa-fw',
      link: '/internal/inner-page',
      submenu: null,
    },
    {
      label: 'Users',
      icon: 'fas fa-users fa-fw',
      link: '/internal/inner-page',
      submenu: null,
    },
    {
      label: 'Teams',
      icon: 'fas fa-award fa-fw',
      link: '/internal/inner-page',
      submenu: null,
    },
    {
      label: 'Transactions',
      icon: 'fas fa-money-bill fa-fw',
      link: '/internal/inner-page',
      submenu: null,
    },
    {
      label: 'Topups',
      icon: 'fas fa-coins fa-fw',
      link: '/internal/inner-page',
      submenu: null,
    },
    {
      label: 'Point System',
      icon: 'fas fa-award fa-fw',
      link: '/internal/inner-page',
      submenu: null,
    },
    {
      label: 'Support',
      icon: 'fas fa-circle-info fa-fw',
      link: '/internal/inner-page',
      submenu: null,
    },
  ];

  return (
    <nav id="sidebarMenu" className="collapse d-lg-block masterNav collapse bg-white">
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3">
          {
            masterMenus.map((item, index) => (
              <React.Fragment key={index}>
                <div className={`list-group-item list-group-item-action py-2 cursor-pointer ${
                    expanded === index ? 'active' : ''
                  }`}
                  onClick={() => toggleExpansion(index)}
                >
                  <i className={`${item.icon} me-2`}></i>
                  {
                      item.link ? 
                      <Link to={item.link}>
                        <span>{item.label}</span>
                      </Link> : <span>{item.label}</span>
                  }
                  {item.submenu && (
                    <i className={`fas fa-chevron-${expanded === index ? 'up' : 'down'} ms-3`}></i>
                  )}
                </div>
                {item.submenu && expanded === index && (
                  <div className="submenu">
                    {item.submenu.map((subitem, subindex) => (
                      <Link
                        key={subindex}
                        to={subitem.link}
                        className="list-group-item list-group-item-action py-2 ripple submenu-item"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))
          }
        </div>
      </div>
    </nav>
  );
};

export default InternalControlls;
