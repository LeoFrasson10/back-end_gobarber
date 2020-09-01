import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatar from './UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg');
  });  

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

    await expect(updateUserAvatar.execute({
      user_id: "non-existing-user",
      avatarFilename: 'avatar.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });  

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });   
  
});