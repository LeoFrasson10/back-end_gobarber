import {injectable, inject} from 'tsyringe';

// import User from "../infra/typeorm/entities/User";
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

interface IRequest{
  email: string;
}

@injectable()
class SendForgotPasswordEmailService{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokensRepository: IUserTokenRepository,
  ){}
  
  public async execute({email}: IRequest ): Promise<void>{
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('User does nor exists');
    }

    const {token} = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(email, `Pedido de recuperação de senha recebido: ${token}`  )
  }
}
export default SendForgotPasswordEmailService;