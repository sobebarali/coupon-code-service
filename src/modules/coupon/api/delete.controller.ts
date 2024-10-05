import { Request, Response } from 'express';
import runValidation from '../../../utils/runValidation';
import deleteSchema from '../validators/delete.validator';
import deleteCoupon from '../handlers/delete.handler';
import { typePayload } from '../types/delete.types';

export default async function endpointDeleteCoupon(
  req: Request,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: deleteSchema,
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
    let result = await deleteCoupon(payload);
    if (result.error) {
      res.status(result.error.statusCode).send(result);
    } else {
      res.status(200).send(result);
    }
  }
}
