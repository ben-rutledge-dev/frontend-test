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

  const columns: Column<CustomerWithVehicleCount>[] = [
    { key: "id", label: "ID", render: (row) => row.id },
    { key: "firstName", label: "First Name", render: (row) => row.firstName },
    { key: "lastName", label: "Last Name", render: (row) => row.lastName },
    {
      key: "vehicleCount",
      label: "Vehicle Count",
      render: (row) => row.vehicleCount,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: CustomerWithVehicleCount) => (
        <Link
          to={`/customers/${row.id}`}
          style={{ color: "#0066cc", textDecoration: "underline" }}
        >
          View Details
        </Link>
      ),
    },
  ];

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
