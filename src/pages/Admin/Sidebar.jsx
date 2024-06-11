import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faList, faGlobe, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  // window.location.href = '/login';
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Hayphim-ADMIN</h2>
      <ul>
        <li>
          <NavLink to="/admin/manage-movies" activeClassName="active">
            <FontAwesomeIcon icon={faFilm} />
            Quản lý phim
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-categories" activeClassName="active">
            <FontAwesomeIcon icon={faList} />
            Quản lý thể loại
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-countries" activeClassName="active">
            <FontAwesomeIcon icon={faGlobe} />
            Quản lý quốc gia
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-actors" activeClassName="active">
            <FontAwesomeIcon icon={faUsers} />
            Quản lý diễn viên
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/login" activeClassName="active">
          <FontAwesomeIcon onClick={handleLogout} icon={faSignOutAlt} />
            Đăng xuất
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
