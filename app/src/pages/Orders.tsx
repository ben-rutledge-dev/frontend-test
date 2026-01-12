import React from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import Button from "../components/Button";
import Modal from "../components/Modal";

interface Modal {}

function Orders() {
  const [modal, setModal] = React.useState<Modal | null>(null);
  return (
    <div>
      <Header>
        <Title>Orders</Title>
        <Button onClick={() => setModal({})}>Create Order</Button>
      </Header>
      <p>Orders page content</p>
      {modal && (
        <Modal onClose={() => setModal(null)}>
          <h2>Create New Order</h2>
          <p>Order creation form goes here.</p>
        </Modal>
      )}
    </div>
  );
}

export default Orders;
