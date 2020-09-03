import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';

import cors from 'cors';
import 'express-async-errors';

import { errors } from 'celebrate';

import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';


import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
//rota para visualizar os arquivos
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

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
