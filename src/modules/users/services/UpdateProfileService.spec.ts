import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  })
  it('should be able update the profile', async () => {
    
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    })

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com'
    })

    expect(updateUser.name).toBe('John Trê');
    expect(updateUser.email).toBe('johntre@example.com');
  }); 
  it('should not be able to update the profile from non-existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'non-existing-user_id',
      name: 'Test',
      email: 'Test@gmail.com'
    })).rejects.toBeInstanceOf(AppError);
  });  
  it('should not be able to change to another user email', async () => {
    
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should be able update the password', async () => {
    
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    })

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '123123',
    })

    expect(updateUser.password).toBe('123123');
  }); 
  it('should not be able update the password without old password ', async () => {
    
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    })

     await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  }); 
  it('should not be able update the password wit wrong old password ', async () => {
    
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    })

     await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      old_password: 'wrong-old-password',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  }); 
  
});