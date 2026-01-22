import { Vehicle } from '../types.js';
import { vehicleExternalService } from '../external_services_mock/vehicleExternalService.js';

export const vehicleService = {
  async getAllVehicles(): Promise<Vehicle[]> {
    return vehicleExternalService.getAllVehicles();
  },

  async getVehicleById(id: string): Promise<Vehicle | undefined> {
    return vehicleExternalService.getVehicleById(id);
  },

  async getVehiclesByCustomerId(customerId: string): Promise<Vehicle[]> {
    return vehicleExternalService.getVehiclesByCustomerId(customerId);
  },
};
