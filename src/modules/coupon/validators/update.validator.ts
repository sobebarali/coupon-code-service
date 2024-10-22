import Joi from "joi";
import { typePayload } from "../types/update.types";

const updateSchema = Joi.object<typePayload>({
  code: Joi.string().min(2).max(100),
  repeatCountConfig: Joi.object()
    .keys({
      globalTotal: Joi.any(),
      userTotal: Joi.number(),
      userDaily: Joi.number(),
      userWeekly: Joi.number(),
    })
});

export default updateSchema;
