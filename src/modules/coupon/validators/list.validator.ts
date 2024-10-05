import Joi from 'joi';
import { typePayload } from '../types/list.types';

const listSchema = Joi.object<typePayload>({
  userId: Joi.string().min(2).max(100).required(),
  page: Joi.number().required(),
  perPage: Joi.number().required(),
});

export default listSchema;
