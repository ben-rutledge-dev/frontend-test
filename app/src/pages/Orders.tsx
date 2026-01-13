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
    { key: "reference", label: "Reference" },
    { key: "customerId", label: "Customer ID" },
    { key: "vehicleId", label: "Vehicle ID" },
    { key: "garageId", label: "Garage ID" },
    { key: "createdDate", label: "Created Date" },
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
