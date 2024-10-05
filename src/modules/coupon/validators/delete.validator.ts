import Joi from 'joi';
import { typePayload } from '../types/delete.types';

const deleteSchema = Joi.object<typePayload>({
  couponId: Joi.string().min(2).max(100).required(),
});

export default deleteSchema;
