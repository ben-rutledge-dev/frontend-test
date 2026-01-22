import { customers } from './database.js';
import { Customer } from '../types.js';
import { NetworkDelayEmulator } from './NetworkDelayEmulator.js';

const customerExternalServiceImpl = {
  getAllCustomers(): Customer[] {
    return customers;
  },
  getCustomerById(id: string): Customer | undefined {
    return customers.find(c => c.id === id);
  },
  getCustomersById(ids: string[]): Customer[] {
    return customers.filter(c => ids.includes(c.id));
  }
};

export const customerExternalService = NetworkDelayEmulator(customerExternalServiceImpl);
