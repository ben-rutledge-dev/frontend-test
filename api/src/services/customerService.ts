import { Customer } from '../types.js';
import { customerExternalService } from '../external_services_mock/customerExternalService.js';

export const customerService = {
  getAllCustomers(): Customer[] {
    return customerExternalService.getAllCustomers();
  },

  getCustomerById(id: number): Customer | undefined {
    return customerExternalService.getCustomerById(id);
  },
};
