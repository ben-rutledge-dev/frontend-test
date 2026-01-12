import { garages } from '../database.js';
import { Garage } from '../types.js';
import { NetworkDelayEmulator } from '../NetworkDelayEmulator.js';

const garageServiceImpl = {
  getAllGarages(): Garage[] {
    return garages;
  },

  getGarageById(id: number): Garage | undefined {
    return garages.find(g => g.id === id);
  },
};

export const garageService = NetworkDelayEmulator(garageServiceImpl);
