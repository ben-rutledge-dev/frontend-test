import { Router, Request, Response } from 'express';
import { customerService } from './services/customerService.js';
import { vehicleService } from './services/vehicleService.js';
import { orderService } from './services/orderService.js';
import { garageService } from './services/garageService.js';
import { Customer, CreateOrderRequest } from './types.js';

export const router: Router = Router();

interface CustomersWithVehicleCount extends Customer {
  vehicleCount: number;
}

// GET all customers
router.get('/customers', async (req: Request, res: Response) => {
  const customers = await customerService.getAllCustomers();
  let customersWithVehicleCount: CustomersWithVehicleCount[] = [];
  for(const customer of customers) {
    const vehicles = await vehicleService.getVehiclesByCustomerId(customer.id);
    customersWithVehicleCount.push({
      ...customer,
      vehicleCount: vehicles.length
    });
  }
  res.json(customersWithVehicleCount);
});

// GET single customer by id
router.get('/customers/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const customer = await customerService.getCustomerById(id);

  if (!customer) {
    throw new Error('Customer not found');
  }

  res.json(customer);
});

// GET vehicles by customer ID
router.get('/customers/:id/vehicles', async (req: Request, res: Response) => {
  const customerId = req.params.id;
  const customerVehicles = await vehicleService.getVehiclesByCustomerId(customerId);
  res.json(customerVehicles);
});

// GET all orders (paginated)
router.get('/orders', async (req: Request, res: Response) => {
  const result = await orderService.getAllOrders();
  res.json(result);
});

// GET single order by id
router.get('/orders/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const order = await orderService.getOrderById(id);

  if (!order) {
    throw new Error('Order not found');
  }

  res.json(order);
});

// GET orders by customer ID
router.get('/customers/:id/orders', async (req: Request, res: Response) => {
  const customerId = req.params.id;
  const customerOrders = await orderService.getOrdersByCustomerId(customerId);
  res.json(customerOrders);
});

router.post('/orders', async (req: Request<{}, {}, CreateOrderRequest>, res: Response) => {
  const { customerId, vehicleId, garageId } = req.body;
  const newOrder = await orderService.createOrder({ customerId, vehicleId, garageId, });
  res.json(newOrder);
});

// GET all garages
router.get('/garages', async (req: Request, res: Response) => {
  const garages = await garageService.getAllGarages();
  res.json(garages);
});

// GET single garage by id
router.get('/garages/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const garage = await garageService.getGarageById(id);

  if (!garage) {
    throw new Error('Garage not found');
  }

  res.json(garage);
});
