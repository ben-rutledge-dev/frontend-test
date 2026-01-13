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
      try {
        setLoading(true);
        const customerId = parseInt(id || "0");

        const [customerData, vehiclesData] = await Promise.all([
          apiClient.getCustomerById(customerId),
          apiClient.getVehiclesByCustomerId(customerId),
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

  const vehicleColumns = [
    { key: "id", label: "ID" },
    { key: "licensePlate", label: "License Plate" },
    { key: "make", label: "Make" },
    { key: "model", label: "Model" },
  ] as Column<Vehicle>[];

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
