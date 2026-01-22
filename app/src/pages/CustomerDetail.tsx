import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Title from "../components/Title";
import Table, { Column } from "../components/Table";
import { apiClient, Customer, Vehicle } from "../apiClient";

function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);

        const [customerData, vehiclesData] = await Promise.all([
          apiClient.getCustomerById(id),
          apiClient.getVehiclesByCustomerId(id),
        ]);

        setCustomer(customerData);
        setVehicles(vehiclesData);
      } catch (err) {
        setError("Failed to load customer data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const vehicleColumns: Column<Vehicle>[] = [
    { key: "id", label: "ID", render: (row) => row.id },
    {
      key: "licensePlate",
      label: "License Plate",
      render: (row) => row.licensePlate,
    },
    { key: "make", label: "Make", render: (row) => row.make },
    { key: "model", label: "Model", render: (row) => row.model },
  ];

  if (loading) {
    return (
      <div>
        <Header>
          <Title>Customer Details</Title>
        </Header>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div>
        <Header>
          <Title>Customer Details</Title>
        </Header>
        <p style={{ color: "red" }}>{error || "Customer not found"}</p>
      </div>
    );
  }

  return (
    <div>
      <Header>
        <Title>Customer Details</Title>
      </Header>

      <div style={{ marginBottom: "2rem" }}>
        <h3>Customer Information</h3>
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "0.5rem 1rem",
            maxWidth: "600px",
          }}
        >
          <dt style={{ fontWeight: "bold" }}>ID:</dt>
          <dd style={{ margin: 0 }}>{customer.id}</dd>

          <dt style={{ fontWeight: "bold" }}>First Name:</dt>
          <dd style={{ margin: 0 }}>{customer.firstName}</dd>

          <dt style={{ fontWeight: "bold" }}>Last Name:</dt>
          <dd style={{ margin: 0 }}>{customer.lastName}</dd>
        </dl>
      </div>

      <div>
        <h3>Vehicles</h3>
        {vehicles && vehicles.length > 0 ? (
          <Table data={vehicles} columns={vehicleColumns} />
        ) : (
          <p>No vehicles found for this customer.</p>
        )}
      </div>
    </div>
  );
}

export default CustomerDetail;
