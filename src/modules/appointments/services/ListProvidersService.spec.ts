import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersSevice from './ListProvidersService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersSevice;

describe('ListProviders', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersSevice(fakeUsersRepository);
  })
  it('should be able to list the providers', async () => {
    
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456',
    });

    const loggeedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggeedUser.id,
    })

    expect(providers).toEqual([
      user1, user2
    ]);
  });    

});