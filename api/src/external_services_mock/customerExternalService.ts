import { customers } from './database.js';
import { Customer } from '../types.js';
import { NetworkDelayEmulator } from './NetworkDelayEmulator.js';

const customerExternalServiceImpl = {
  getAllCustomers(): Customer[] {
    return customers;
  },

  getCustomerById(id: number): Customer | undefined {
    return customers.find(c => c.id === id);
  },
};

export const customerExternalService = NetworkDelayEmulator(customerExternalServiceImpl);
