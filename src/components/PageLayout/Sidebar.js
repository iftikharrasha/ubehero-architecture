import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { wishList } = useSelector((state) => state.tournaments);

  return (
    <div className='col-md-3'>
      <ul className='list-group sticky-top  py-2'>
        <NavLink as='li' className='list-group-item' to='/' exact>
          Home
        </NavLink>
        <NavLink as='li' className='list-group-item' to='/tournaments/wishList'>
          Wishlist <span className='badge badge-sm bg-primary'>{wishList.length}</span>
        </NavLink>
        <NavLink as='li' className='list-group-item' to='/tournaments/registered'>
          Registered <span className='badge badge-sm bg-primary'>0</span>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
