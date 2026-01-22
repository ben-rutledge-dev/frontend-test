import { customers, vehicles, orders, garages } from './database.js';
import { v4 as uuidv4 } from 'uuid';

const customerIdMap: Record<number, string> = {};
const vehicleIdMap: Record<number, string> = {};
const garageIdMap: Record<number, string> = {};

for(const customer of customers) {
  const uuid = uuidv4();
  customerIdMap[customer.id as unknown as number] = uuid;
  customer.id = uuid;
}

for(const garage of garages) {
  const uuid = uuidv4();
  garageIdMap[garage.id as unknown as number] = uuid;
  garage.id = uuid;
}

for(const vehicle of vehicles) {
  const uuid = uuidv4();
  vehicleIdMap[vehicle.id as unknown as number] = uuid;
  vehicle.id = uuid;
  vehicle.customerId = customerIdMap[vehicle.customerId as unknown as number];
}

for(const order of orders) {
  const uuid = uuidv4();
  order.id = uuid;
  order.customerId = customerIdMap[order.customerId as unknown as number];
  order.vehicleId = vehicleIdMap[order.vehicleId as unknown as number];
  order.garageId = garageIdMap[order.garageId as unknown as number];
}

console.log(JSON.stringify(customers));
console.log(JSON.stringify(vehicles));
console.log(JSON.stringify(orders));
console.log(JSON.stringify(garages));