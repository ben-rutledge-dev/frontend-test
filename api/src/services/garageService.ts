import { Garage } from '../types.js';
import { garageExternalService } from '../external_services_mock/garageExternalService.js';

export const garageService = {
  getAllGarages(): Garage[] {
    return garageExternalService.getAllGarages();
  },

  getGarageById(id: number): Garage | undefined {
    return garageExternalService.getGarageById(id);
  },
};
