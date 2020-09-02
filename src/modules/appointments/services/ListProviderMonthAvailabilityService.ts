import {injectable, inject} from 'tsyringe';
import {getDaysInMonth, getDate} from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest{
  provider_id: string;
  month: number;
  year: number;

}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ){}

  public async execute({ provider_id, year, month }: IRequest) : Promise<IResponse>{
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month,
    })
    
    const numberOfDaysIsMonth = getDaysInMonth(
      new Date(year, month -1)
    );

    //array com tds os dias do mes
    const eachDayArray = Array.from(
      { length: numberOfDaysIsMonth },
      (_, index) => index + 1,
    );
    
    //filtra por dia e vÊ se tem horario disponivel
    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      }
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService ;