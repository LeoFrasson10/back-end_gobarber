import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointments: CreateAppointmentService;


describe('CreateApponitment', () => {
  beforeEach(() => {
   fakeAppointmentsRepository = new FakeAppointmentsRepository();
   createAppointments = new CreateAppointmentService(fakeAppointmentsRepository);
  })

  it('should be able to create a new appointment', async () => {
    const appointmnet = await createAppointments.execute({
      date: new Date(),
      provider_id: '123123123',
      user_id: '12313213'
    })

    expect(appointmnet).toHaveProperty('id');
    expect(appointmnet.provider_id).toBe('123123123');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointments.execute({
      date:appointmentDate,
      provider_id: '123123123',
      user_id: '12313213'
    });

    expect(createAppointments.execute({
      date:appointmentDate,
      provider_id: '123123123',
      user_id: '12313213',
    })).rejects.toBeInstanceOf(AppError);
  });
});