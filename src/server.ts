import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';


import './database';

const app = express();

app.use(express.json());
//rota para visualizar os arquivos
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

//tratativas de erros
app.use((err: Error, request: Request, response: Response, _: NextFunction) =>{
  //verirficar se o erro é uma instancia do class error
  if (err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
});

app.listen(3333, () => {
  console.log('server started on port 3333!');
});
