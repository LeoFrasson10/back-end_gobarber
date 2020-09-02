import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseEmailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class HandlwbarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variable }: IParseEmailTemplateDTO): Promise<string>{
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variable);
  }
}

export default HandlwbarsMailTemplateProvider;