import { Garage } from '../types.js';
import { garageExternalService } from '../external_services_mock/garageExternalService.js';

export const garageService = {
  async getAllGarages(): Promise<Garage[]> {
    return garageExternalService.getAllGarages();
  },

  async getGarageById(id: number): Promise<Garage | undefined> {
    return garageExternalService.getGarageById(id);
  },
};
