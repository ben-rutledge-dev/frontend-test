import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faUsers } from "@fortawesome/free-solid-svg-icons";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
        <main className="main-content">
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
