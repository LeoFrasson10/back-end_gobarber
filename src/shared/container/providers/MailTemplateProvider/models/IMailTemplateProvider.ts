import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProider{
  parse(data: IParseMailTemplateDTO): Promise<string>;
}