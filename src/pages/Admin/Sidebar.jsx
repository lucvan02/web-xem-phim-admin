// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFilm, faList, faGlobe, faUsers } from '@fortawesome/free-solid-svg-icons';
// import './Sidebar.css';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <h2>Hayphim-ADMIN</h2>
//       <ul>
//         <li>
//           <Link to="/admin/manage-movies">
//             <FontAwesomeIcon icon={faFilm} />
//             Quản lý phim
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/manage-categories">
//             <FontAwesomeIcon icon={faList} />
//             Quản lý thể loại
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/manage-countries">
//             <FontAwesomeIcon icon={faGlobe} />
//             Quản lý quốc gia
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/manage-actors">
//             <FontAwesomeIcon icon={faUsers} />
//             Quản lý diễn viên
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;





import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faList, faGlobe, faUsers } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

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
      </ul>
    </div>
  );
};

export default Sidebar;
