import {injectable, inject} from 'tsyringe';
import path from 'path';
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

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views','forgot_password.hbs',)

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variable: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}
export default SendForgotPasswordEmailService;