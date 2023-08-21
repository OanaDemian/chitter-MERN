import { check } from 'express-validator';

export const newPeepValidation = [
  check('name').exists(),
  check('username').exists(),
  check('userId').exists(),
  check('content').exists(),
  check('date').exists().isISO8601(),    
  check('').isBoolean()
];
