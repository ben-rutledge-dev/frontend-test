import { garages } from './database.js';
import { Garage } from '../types.js';
import { NetworkDelayEmulator } from './NetworkDelayEmulator.js';

const garageExternalServiceImpl = {
  getAllGarages(): Garage[] {
    return garages;
  },

  getGarageById(id: string): Garage | undefined {
    return garages.find(g => g.id === id);
  },
};

export const garageExternalService = NetworkDelayEmulator(garageExternalServiceImpl);
