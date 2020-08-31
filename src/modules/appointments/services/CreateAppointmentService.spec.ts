import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateApponitment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointments = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmnet = await createAppointments.execute({
      date: new Date(),
      provider_id: '123123123',
    })

    expect(appointmnet).toHaveProperty('id');
    expect(appointmnet.provider_id).toBe('123123123');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointments = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointments.execute({
      date:appointmentDate,
      provider_id: '123123123',
    });

    expect(createAppointments.execute({
      date:appointmentDate,
      provider_id: '123123123',
    })).rejects.toBeInstanceOf(AppError);
  });
});