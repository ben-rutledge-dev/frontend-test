import { Router, Request, Response } from 'express';
import { customerService } from './services/customerService.js';
import { vehicleService } from './services/vehicleService.js';
import { orderService } from './services/orderService.js';
import { garageService } from './services/garageService.js';

export const router: Router = Router();

// GET all customers
router.get('/customers', async (req: Request, res: Response) => {
  const customers = await customerService.getAllCustomers();
  res.json(customers);
});

// GET vehicles by customer ID
router.get('/customers/:id/vehicles', async (req: Request, res: Response) => {
  const customerId = parseInt(req.params.id);
  const customerVehicles = await vehicleService.getVehiclesByCustomerId(customerId);
  res.json(customerVehicles);
});

// GET all orders (paginated)
router.get('/orders', async (req: Request, res: Response) => {
  const pageNumber = parseInt(req.query.pageNumber as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  
  const result = await orderService.getPaginatedOrders(pageNumber, pageSize);
  res.json(result);
});

// GET single order by id
router.get('/orders/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const order = await orderService.getOrderById(id);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
});

// GET orders by customer ID
router.get('/customers/:id/orders', async (req: Request, res: Response) => {
  const customerId = parseInt(req.params.id);
  const customerOrders = await orderService.getOrdersByCustomerId(customerId);
  res.json(customerOrders);
});

// GET all garages
router.get('/garages', async (req: Request, res: Response) => {
  const garages = await garageService.getAllGarages();
  res.json(garages);
});

// GET single garage by id
router.get('/garages/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const garage = await garageService.getGarageById(id);
  
  if (!garage) {
    return res.status(404).json({ error: 'Garage not found' });
  }
  
  res.json(garage);
});
