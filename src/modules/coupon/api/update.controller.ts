import { Request, Response } from 'express';
import runValidation from '../../../utils/runValidation';
import updateSchema from '../validators/update.validator';
import updateCoupon from '../handlers/update.handler';
import { typePayload } from '../types/update.types';

export default async function endpointUpdateCoupon(
  req: Request,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: updateSchema,
  });

  if (typeof validationResult.error !== 'undefined') {
    return res.status(400).json({
      data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: validationResult.error.details[0].message,
      },
    });
  } else {
    const payload = req.body as typePayload;
    let result = await updateCoupon(payload);
    if (result.error) {
      res.status(result.error.statusCode).send(result);
    } else {
      res.status(200).send(result);
    }
  }
}
