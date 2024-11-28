import { coerce, object, string, z, ZodIssueCode } from 'zod';

export const completePaymentSchema = object({
  pin: string().optional(),
  otp: string().optional(),
  phone: string()
    .regex(/^(?:(?:\+|0{1,2})[- )(?]*\d{0,3}[- )(?]*\d{3}[- )(?]*\d{3}[- )(?]*\d{4})$/, 'Invalid phone number')
    .optional(),
  birthday: coerce.date({ invalid_type_error: 'Birthday should be a date' }).optional(),
  reference: string({ required_error: 'Reference is required' }).min(1, 'Invalid reference'),
}).superRefine((data, ctx) => {
  const optionalFields: Array<keyof typeof data> = ['pin', 'otp', 'phone', 'birthday'];
  const providedFields = optionalFields.filter((field) => data[field] !== undefined);
  if (providedFields.length !== 1) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Exactly one of pin, otp, phone, or birthday must be provided',
      path: optionalFields,
    });
  }
});

export type CompletePaymentType = z.infer<typeof completePaymentSchema>;
