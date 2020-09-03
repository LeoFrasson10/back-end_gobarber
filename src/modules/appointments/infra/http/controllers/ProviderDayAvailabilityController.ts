import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProvidersDayService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response>{
    const { provider_id } = request.params;
    const { day, month, year} = request.body;
  
    const listProvidersDayService = container.resolve(ListProvidersDayService);

    const availability = await listProvidersDayService.execute({ 
      provider_id,
      day,
      month,
      year,
    });

  return response.json(availability);
  }
}