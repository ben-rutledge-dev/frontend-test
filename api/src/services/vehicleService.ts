import { Vehicle } from '../types.js';
import { vehicleExternalService } from '../external_services_mock/vehicleExternalService.js';

export const vehicleService = {
  getAllVehicles(): Vehicle[] {
    return vehicleExternalService.getAllVehicles();
  },

  getVehicleById(id: number): Vehicle | undefined {
    return vehicleExternalService.getVehicleById(id);
  },

  getVehiclesByCustomerId(customerId: number): Vehicle[] {
    return vehicleExternalService.getVehiclesByCustomerId(customerId);
  },
};
