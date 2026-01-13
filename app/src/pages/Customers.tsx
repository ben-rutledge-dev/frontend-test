import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Title from "../components/Title";
import Table, { Column } from "../components/Table";
import { apiClient, CustomerWithVehicleCount } from "../apiClient";

function Customers() {
  const [customers, setCustomers] = useState<CustomerWithVehicleCount[] | null>(
    null
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await apiClient.getCustomers();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "vehicleCount", label: "Vehicle Count" },
    {
      key: "_actions",
      label: "Actions",
      render: (_, row) => (
        <Link
          to={`/customers/${row.id}`}
          style={{ color: "#0066cc", textDecoration: "underline" }}
        >
          View Details
        </Link>
      ),
    },
  ] as Column<CustomerWithVehicleCount>[];

  return (
    <div>
      <Header>
        <Title>Customers</Title>
      </Header>
      {customers && <Table data={customers} columns={columns} />}
    </div>
  );
}

export default Customers;
