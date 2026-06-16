import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Table, { Column } from "../components/Table";
import { apiClient, Customer, Garage, Order, Vehicle } from "../apiClient";
import SearchableDropdown from '../components/SearchableDropdown';

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = useCallback(async () => {
      const data = await apiClient.getOrders();
      setOrders(data);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
        <Button onClick={() => setShowModal(true)}>Create Order</Button>
      </Header>
      {orders?.length > 0 ? (
        <Table data={orders} columns={orderColumns} />
      ) : (
        <p>No orders found.</p>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Create Order</h2>
          <OrderForm onClose={() => setShowModal(false)} refetchOrders={fetchOrders} />
        </Modal>
      )}
    </div>
  );
}

type OrderFormProps = {
  onClose: () => void;
  refetchOrders: () => void;
};

const OrderForm: React. FC<OrderFormProps> = (props) => {
  const { onClose, refetchOrders } = props;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiClient.postOrder({
      customerId: selectedCustomer!,
      vehicleId: selectedVehicle!,
      garageId: selectedGarage!,
    });

    refetchOrders();
    onClose();
  };

  const [selectedGarage, setSelectedGarage] = useState<string | undefined>(undefined);
  const [selectedVehicle, setSelectedVehicle] = useState<string | undefined>(undefined);
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(undefined);

  return (
    <form onSubmit={handleSubmit}>
      <GarageSelect  value={selectedGarage} onChange={setSelectedGarage} />
      <CustomerSelect
        value={selectedCustomer}
        onChange={setSelectedCustomer}
      />
      {selectedCustomer && (
        <VehicleSelect
          customerId={selectedCustomer}
          value={selectedVehicle}
          onChange={setSelectedVehicle}
        />
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
};

type GarageSelectProps = {
  value?: string;
  onChange: (value: string | undefined) => void;
};

const GarageSelect: React.FC<GarageSelectProps> = (props) => {
  const { value, onChange } = props;
  const [garages, setGarages] = useState<Garage[]>([]);

  useEffect(() => {
    const fetchGarages = async () => {
      const data = await apiClient.getGarages();
      setGarages(data);
    };

    fetchGarages();
  }, []);

  const garagesOptions = garages.map((garage) => ({
    value: garage.id,
    label: garage.name,
  }));

  return (
    <SearchableDropdown
      options={garagesOptions}
      placeholder="Select a garage"
      value={value}
      onChange={onChange}
    />
  )
}

type CustomerSelectProps = {
  value?: string;
  onChange: (value: string | undefined) => void;
};

const CustomerSelect: React.FC<CustomerSelectProps> = (props) => {
  const { value, onChange } = props;
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await apiClient.getCustomers();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const customersOptions = customers.map((customer) => ({
    value: customer.id,
    label: `${customer.firstName} ${customer.lastName}`,
  }));

  return (
    <SearchableDropdown
      options={customersOptions}
      placeholder="Select a customer"
      value={value}
      onChange={onChange}
    />
  )
}

type VehicleSelectProps = {
  customerId: string;
  value?: string;
  onChange: (value: string | undefined) => void;
};

const VehicleSelect: React.FC<VehicleSelectProps> = (props) => {
  const { customerId, value, onChange } = props;
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await apiClient.getVehiclesByCustomerId(customerId);
      setVehicles(data);
    };

    fetchVehicles();
  }, []);

  const vehiclesOptions = vehicles.map((vehicle) => ({
    value: vehicle.id,
    label: `${vehicle.make} ${vehicle.model}`,
  }));

  return (
    <SearchableDropdown
      options={vehiclesOptions}
      placeholder="Select a vehicle"
      value={value}
      onChange={onChange}
    />
  )
}

export default Orders;
