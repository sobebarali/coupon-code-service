import Joi from 'joi';
import { typePayload } from '../types/get.types';

const getSchema = Joi.object<typePayload>({
  couponId: Joi.string().min(2).max(100).required(),
});

export default getSchema;
