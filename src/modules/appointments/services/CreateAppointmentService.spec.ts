import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationRepository: FakeNotificationRepository;


describe('CreateApponitment', () => {
  beforeEach(() => {
   fakeAppointmentsRepository = new FakeAppointmentsRepository();
   fakeNotificationRepository = new FakeNotificationRepository();
   createAppointment = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationRepository);
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });


    const appointmnet = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'provider-id',
      user_id: 'user-id'
    })

    expect(appointmnet).toHaveProperty('id');
    expect(appointmnet.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    createAppointment.execute({
      date:appointmentDate,
      provider_id: 'provider-id',
      user_id: 'user-id'
      
    });

    await expect(createAppointment.execute({
      date:appointmentDate,
      provider_id: 'provider-id',
      user_id: 'user-id'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date:new Date(2020, 4, 10, 11),
      provider_id: 'provider-id',
      user_id: 'user-id'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointmenmt with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date:new Date(2020, 4, 10, 13),
      provider_id: 'user-id',
      user_id: 'user-id',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointmenmt before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date:new Date(2020, 4, 11, 7),
      provider_id: 'provider-id',
      user_id: 'user-id',
    })).rejects.toBeInstanceOf(AppError);
  
    await expect(createAppointment.execute({
      date:new Date(2020, 4, 11, 18),
      provider_id: 'provider-id',
      user_id: 'user-id',
    })).rejects.toBeInstanceOf(AppError);
  });
});