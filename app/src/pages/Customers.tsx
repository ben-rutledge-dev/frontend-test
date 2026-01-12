import { useState, useEffect } from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import Table, { Column } from "../components/Table";
import { apiClient, Customer } from "../apiClient";

function Customers() {
  const [customers, setCustomers] = useState<Customer[] | null>(null);

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
  ] as Column<Customer>[];

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
