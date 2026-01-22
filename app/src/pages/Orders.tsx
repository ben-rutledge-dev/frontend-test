import { useState, useEffect } from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import Button from "../components/Button";
import Table, { Column } from "../components/Table";
import { apiClient, Order } from "../apiClient";

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await apiClient.getOrders();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const orderColumns: Column<Order>[] = [
    { key: "reference", label: "Reference", render: (row) => row.reference },
    {
      key: "customerId",
      label: "Customer ID",
      render: (row) => row.customerId,
    },
    { key: "vehicleId", label: "Vehicle ID", render: (row) => row.vehicleId },
    { key: "garageId", label: "Garage ID", render: (row) => row.garageId },
    {
      key: "createdDate",
      label: "Created Date",
      render: (row) => row.createdDate,
    },
  ];

  return (
    <div>
      <Header>
        <Title>Orders</Title>
        <Button onClick={() => {}}>Create Order</Button>
      </Header>
      {orders?.length > 0 ? (
        <Table data={orders} columns={orderColumns} />
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default Orders;
