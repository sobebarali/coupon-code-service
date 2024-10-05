import Joi from 'joi';
import { typePayload } from '../types/create.types';

const createSchema = Joi.object<typePayload>({
  userId: Joi.string().min(2).max(100).required(),
  code: Joi.string().min(2).max(100).required(),
  repeatCountConfig: Joi.object()
    .keys({
      globalTotal: Joi.any().required(),
      userTotal: Joi.number().required(),
      userDaily: Joi.number().required(),
      userWeekly: Joi.number().required(),
    })
    .required(),
});

export default createSchema;
