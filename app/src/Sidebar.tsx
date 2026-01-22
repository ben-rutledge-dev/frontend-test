import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faUsers } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>FE Test</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="nav-icon">
            <FontAwesomeIcon icon={faClipboardList} />
          </span>
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="nav-icon">
            <FontAwesomeIcon icon={faUsers} />
          </span>
          <span>Customers</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
