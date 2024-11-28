import { ISPs, VTUType } from '@/types';
import { boolean, nativeEnum, number, object, string, z } from 'zod';

export const savedReceiverSchema = object({
  firstName: string({ required_error: 'First name is required' }).min(1, 'First name should be atleast 1 character'),
  lastName: string({ required_error: 'Last name is required' }).min(1, 'Last name should be atleast 1 character'),
  phoneNumber: string({ required_error: 'Phone number is required' }).regex(
    /^(?:(?:\+|0{1,2})[- )(?]*\d{0,3}[- )(?]*\d{3}[- )(?]*\d{3}[- )(?]*\d{4})$/,
    'Invalid phone number'
  ),
  network: nativeEnum(ISPs, {
    required_error: 'Network is required',
    invalid_type_error: 'Invalid network',
  }),
});

export const vtuPurchaseSchema = object({
  firstName: string({ required_error: 'First name is required' }).min(1, 'First name should be atleast 1 character'),
  lastName: string({ required_error: 'Last name is required' }).min(1, 'Last name should be atleast 1 character'),
  phoneNumber: string({ required_error: 'Phone number is required' }).min(
    11,
    'Phone number should be atleast 11 characters'
  ),
  network: nativeEnum(ISPs, {
    required_error: 'Network is required',
    invalid_type_error: 'Invalid network',
  }),
  serviceId: string({ required_error: 'Service id is required' }),
  amount: number({ required_error: 'Amount is required', invalid_type_error: 'Amount should be a number' }).min(1),
  dataValue: string().optional(),
  type: nativeEnum(VTUType, {
    required_error: 'Transaction type is required',
    invalid_type_error: 'Invalid transaction type',
  }),
  payReference: string({ required_error: 'Pay reference is required' }),
  useSavedCard: boolean({ invalid_type_error: 'Save card should be true or false' }).optional().default(false),
  saveCard: boolean({ invalid_type_error: 'Save card should be true or false' }).optional().default(true),
}).refine((data) => (data.type === VTUType.DATA && data.dataValue) || data.type !== VTUType.DATA, {
  message: 'dataValue field is required for data transactions',
  path: ['dataValue'],
});

export type VtuPurchaseType = z.infer<typeof vtuPurchaseSchema>;
