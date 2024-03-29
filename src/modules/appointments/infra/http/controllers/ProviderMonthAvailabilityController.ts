import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProvidersMonthService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response>{
    const { provider_id } = request.params;
    const { month, year} = request.query;
  
    const listProvidersMonthService = container.resolve(ListProvidersMonthService);

    const availability = await listProvidersMonthService.execute({ 
      provider_id,
      month: Number(month),
      year: Number(year),
    });

  return response.json(availability);
  }
}