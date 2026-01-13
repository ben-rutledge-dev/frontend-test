import { Customer } from '../types.js';
import { customerExternalService } from '../external_services_mock/customerExternalService.js';

export const customerService = {
  async getAllCustomers(): Promise<Customer[]> {
    return customerExternalService.getAllCustomers();
  },

  async getCustomerById(id: number): Promise<Customer | undefined> {
    return customerExternalService.getCustomerById(id);
  },
};
