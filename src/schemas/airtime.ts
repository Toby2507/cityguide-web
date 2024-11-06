import { AirtimeNetworks } from '@/types';
import { nativeEnum, object, string } from 'zod';

export const airtimeReceiverSchema = object({
  firstName: string({ required_error: 'First name is required' }).min(3, 'First name requires atleast 3 characters'),
  lastName: string({ required_error: 'Last name is required' }).min(3, 'Last name requires atleast 3 characters'),
  phoneNumber: string({ required_error: 'Phone number is required' }).regex(
    /^(?:(?:\+|0{1,2})[- )(?]*\d{0,3}[- )(?]*\d{3}[- )(?]*\d{3}[- )(?]*\d{4})$/,
    'Invalid phone number'
  ),
  network: nativeEnum(AirtimeNetworks, {
    required_error: 'Receiver network is required',
    invalid_type_error: 'Network should be MTN | GLO | Airtel | 9Mobile',
  }),
});
