import FaqHelp from '@/components/help/faq';
import FaqAccordion from '@/components/help/faq-accordion';
import HelpCentre from '@/components/help/help-centre';
import SafetyHelp from '@/components/help/safety';
import { nanoid } from 'nanoid';
import {
  bookingDetailsFaq,
  cancellationFaq,
  creditCardsFaq,
  extraFacilitiesFaq,
  paymentFaq,
  pricingFaq,
  propertyPoliciesFaq,
  roomTypesFaq,
  securityAwarenessFaq,
} from './core';

export const helpData = [
  { id: 'helpCentre', title: 'Help Centre', Component: <HelpCentre key={nanoid()} /> },
  { id: 'safety', title: 'Trust & Safety resource center', Component: <SafetyHelp key={nanoid()} /> },
  { id: 'faq', title: 'FAQs', Component: <FaqHelp key={nanoid()} /> },
  {
    id: 'cancellation',
    title: 'Cancellation',
    Component: <FaqAccordion key={nanoid()} id="cancellation" data={cancellationFaq} title="Cancellation" />,
  },
  {
    id: 'payment',
    title: 'Payment',
    Component: <FaqAccordion key={nanoid()} id="payment" data={paymentFaq} title="Payment" />,
  },
  {
    id: 'booking',
    title: 'Reservation Details',
    Component: <FaqAccordion key={nanoid()} id="booking" data={bookingDetailsFaq} title="Reservation Details" />,
  },
  {
    id: 'room',
    title: 'Room Types',
    Component: <FaqAccordion key={nanoid()} id="room" data={roomTypesFaq} title="Room Types" />,
  },
  {
    id: 'pricing',
    title: 'Pricing',
    Component: <FaqAccordion key={nanoid()} id="pricing" data={pricingFaq} title="Pricing" />,
  },
  {
    id: 'credit',
    title: 'Credit card',
    Component: <FaqAccordion key={nanoid()} id="credit" data={creditCardsFaq} title="Credit card usage" />,
  },
  {
    id: 'policies',
    title: 'Property Policies',
    Component: <FaqAccordion key={nanoid()} id="policies" data={propertyPoliciesFaq} title="Property Policies" />,
  },
  {
    id: 'extras',
    title: 'Extra Facilities',
    Component: <FaqAccordion key={nanoid()} id="extras" data={extraFacilitiesFaq} title="Extra Facilities" />,
  },
  {
    id: 'security',
    title: 'Security and awareness',
    Component: <FaqAccordion key={nanoid()} id="security" data={securityAwarenessFaq} title="Security and awareness" />,
  },
];
