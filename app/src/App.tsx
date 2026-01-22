import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import "./App.css";
import Sidebar from "./Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar />
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
