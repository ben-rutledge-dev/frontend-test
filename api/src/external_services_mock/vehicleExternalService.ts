import { vehicles } from './database.js';
import { Vehicle } from '../types.js';
import { NetworkDelayEmulator } from './NetworkDelayEmulator.js';

const vehicleExternalServiceImpl = {
  getAllVehicles(): Vehicle[] {
    return vehicles;
  },

  getVehicleById(id: number): Vehicle | undefined {
    return vehicles.find(v => v.id === id);
  },

  getVehiclesByCustomerId(customerId: number): Vehicle[] {
    return vehicles.filter(v => v.customerId === customerId);
  },
};

export const vehicleExternalService = NetworkDelayEmulator(vehicleExternalServiceImpl);
