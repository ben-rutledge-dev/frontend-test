import { Vehicle } from '../types.js';
import { vehicleExternalService } from '../external_services_mock/vehicleExternalService.js';

export const vehicleService = {
  async getAllVehicles(): Promise<Vehicle[]> {
    return vehicleExternalService.getAllVehicles();
  },

  async getVehicleById(id: number): Promise<Vehicle | undefined> {
    return vehicleExternalService.getVehicleById(id);
  },

  async getVehiclesByCustomerId(customerId: number): Promise<Vehicle[]> {
    return vehicleExternalService.getVehiclesByCustomerId(customerId);
  },
};
