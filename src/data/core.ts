import { ISPs } from '@/types';
import { paths } from '@/utils';
import { Library } from '@googlemaps/js-api-loader';
import etisalat from '@icons/9mobile.svg';
import airtel from '@icons/airtel.svg';
import glo from '@icons/glo.svg';
import mtn from '@icons/mtn.svg';

// About
export const aboutData1 = [
  'Lorem ipsum dolor sit amet consectetur. Tempus amet non facilisis ac dolor ipsum sit viverra. Velit ut donec in sed. Proin pharetra vel ut mi malesuada. Aliquam a ultrices nec amet. Nec viverra sapien dignissim quam ipsum quam in purus. In egestas netus curabitur suspendisse neque magnis magna nisi. Velit quisque amet pretium proin mauris lacus risus.',
  'Faucibus vitae gravida nunc venenatis at. Quam adipiscing suspendisse duis lorem in sed augue. Urna tristique duis bibendum tempus. Venenatis egestas sagittis massa dictumst ac quis. Est enim orci eros nisl nunc nibh morbi aenean. Volutpat morbi mi ut viverra metus volutpat leo. Ullamcorper adipiscing scelerisque adipiscing nibh. Mauris quis elementum quis vitae eget arcu et ultrices. Morbi sapien enim sed eget pretium placerat risus vehicula id. Vestibulum euismod adipiscing mauris convallis. Cum nibh nibh mattis quisque facilisis amet feugiat libero rhoncus.',
  'Odio sit potenti mi consequat hendrerit. Feugiat integer non laoreet tincidunt. Pellentesque adipiscing elementum ultrices sit ultricies diam cras. Iaculis neque vel volutpat aliquam non vestibulum sit consequat. Lacus tristique tellus viverra mauris venenatis tristique vel sed.',
  'Adipiscing arcu ac lacinia in malesuada fermentum suspendisse cras auctor. Turpis parturient ipsum consequat malesuada eget aliquam vivamus. Massa euismod risus natoque interdum tristique hendrerit enim nulla in. Augue posuere eget tellus ut purus integer amet nibh mauris. Volutpat ut quam libero sit pretium at non habitant nec. Vulputate amet purus dictum semper suspendisse amet faucibus pharetra dignissim. Scelerisque amet tellus metus diam egestas massa. Nunc sed in auctor',
];

export const aboutData2 = [
  'Lorem ipsum dolor sit amet consectetur. Tempus amet non facilisis ac dolor ipsum sit viverra. Velit ut donec in sed. Proin pharetra vel ut mi malesuada. Aliquam a ultrices nec amet. Nec viverra sapien dignissim quam ipsum quam in purus. In egestas netus curabitur suspendisse neque magnis magna nisi. Velit quisque amet pretium proin mauris lacus risus.',
  'Faucibus vitae gravida nunc venenatis at. Quam adipiscing suspendisse duis lorem in sed augue. Urna tristique duis bibendum tempus. Venenatis egestas sagittis massa dictumst ac quis. Est enim orci eros nisl nunc nibh morbi aenean. Volutpat morbi mi ut viverra metus volutpat leo. Ullamcorper adipiscing scelerisque adipiscing nibh. Mauris quis elementum quis vitae eget arcu et ultrices. Morbi sapien enim sed eget pretium placerat risus vehicula id. Vestibulum euismod adipiscing mauris convallis. Cum nibh nibh mattis quisque facilisis amet feugiat libero rhoncus.',
  'Odio sit potenti mi consequat hendrerit. Feugiat integer non laoreet tincidunt. Pellentesque adipiscing elementum ultrices sit ultricies diam cras. Iaculis neque vel volutpat aliquam non vestibulum sit consequat. Lacus tristique tellus viverra mauris venenatis tristique vel sed.',
];

// Help
export const cancellationFaq = [
  {
    question: 'Can I cancel my booking',
    answer:
      'Yes, any cancellation fees are determined by the property and listed in your cancellation policy. You will pay any additional costs to the property.',
  },
  {
    question: 'If I need to cancel my booking, will I pay a fee',
    answer:
      'If you make a reservation with a property with a cancellation policy, you may incur a cancellation fee. Any cancellation fees are determined by the property. You will pay any additional costs to the property.',
  },
  {
    question: 'Can I cancel or change my dates for a non-refundable booking',
    answer:
      'Cancelling a Non-Refundable booking normally incurs a charge. However, you may have the option to request free cancellation when managing your booking. This sends a request to the property, who may decide to waive your cancellation fee. It is not possible to change dates for a Non-Refundable booking, though it is possible to re-book for your desired dates if your waive fees request is successful.',
  },
  {
    question: 'How do I know if my booking was cancelled',
    answer:
      'After you cancel a booking, you should receive an email confirming the cancellation. If you don’t receive this email, please contact the property directly.',
  },
  {
    question: "Where can I find my property's cancellation policy",
    answer: 'You can find it in the house rules section on the property detail page',
  },
];
export const paymentFaq = [
  {
    question: 'What payment methods are accepted',
    answer:
      'CityGuidesX accepts various payment methods including credit cards (MasterCard, Visa, American Express, etc.), digital payment methods like PayPal, Apple Pay, and in some countries, local payment options like iDeal or Blik. The availability varies by country and region.',
  },
  {
    question: 'Can I pay with a deposit, or prepayment',
    answer:
      'Some of our properties require a prepayment, also known as a deposit, before you stay. This prepayment can be up to the total cost of the booking, or just part of it. The rest is then paid when you stay at the property. However, for some properties there is no deposit required, and you’ll pay the amount in full when you stay at the property. It’s best to check the payment policies in your confirmation for more details.',
  },
  {
    question: 'I’ve been charged. Do I need to do anything',
    answer:
      'In most cases, no action is required from you. As outlined in the payment policy for your booking, this is likely just a prepayment for all or part of the total cost.If there is no prepayment policy, then the property may have taken a test payment from your card. This is a temporary hold, that’s used to guarantee your booking, and will be returned to you.If you still feel the charge is unexpected, you can contact us for assistance. We can only contact the property on your behalf after you have submitted proof of charge',
  },
  {
    question: 'Where can I see the payment policy for my booking',
    answer:
      'You can find it in the house rules section on the property detail page. This section also includes accepted payment methods and cancellation policy.',
  },
  {
    question: 'Why do I need to provide my card details',
    answer:
      'Properties normally request this to guarantee your booking, and the card is often used to pay when you book. If you don’t need to make a prepayment, then they may hold an amount on your card to ensure it has sufficient funds. This test payment will be returned to you.',
  },
  {
    question: 'Can I pay for my stay with a different credit card than the one used to book',
    answer:
      'Very likely, yes. Properties usually accept payment for the stay with a different card or cash. To confirm that paying with a different credit card is okay, contact the property',
  },
  {
    question: 'How will I know who is charging my credit card and when',
    answer:
      'Generally, the property is responsible for charging your card. Payment is commonly expected upon check-in or check-out. Some properties may require a prepayment, which will be clearly stated in your booking confirmation.',
  },
  {
    question: 'Are taxes included in the price',
    answer:
      "This depends on the property and accommodation type. It's easy to see what's included when you compare booking options. Tax requirements change from country to country, so always check your confirmation.",
  },
];
export const bookingDetailsFaq = [
  {
    question: "How do I get more information about the room or property's facilities",
    answer: 'You can find the room and property facilities in your booking confirmation',
  },
  {
    question: 'Is it possible to get an extra bed or cot for a child',
    answer:
      "It depends on the property's policy. Additional costs for children, including extra beds/cots, are not included in the reservation price. Please contact the property directly for this information",
  },
  {
    question: 'How can I get an invoice',
    answer:
      'Only the property can provide an invoice for your completed stay. To receive it quickly, make your request at the property before check out, or contact them directly',
  },
  {
    question: "I can't find my confirmation email. What should I do",
    answer:
      "Be sure to check your email inbox, spam and junk folders. If you still can't find your confirmation, go to CityGuidesX /help and we'll resend it to you",
  },
  {
    question: 'Will I pay the full price for my children',
    answer:
      "Additional costs for children, if any, are not included in the reservation price. Please check with the property directly to see if and when you'll pay for your child(ren).",
  },
  {
    question: "What's the difference between a Double room and a Twin room",
    answer:
      'A Double Room has one double bed and a Twin Room has 2 single beds. If a room is called Double/Twin, it can be set up for either type. The property will do its best to accommodate your needs',
  },
  {
    question: 'I will be arriving outside check-in hours. Can I still check-in',
    answer:
      'This depends on the property who will do their best to meet your needs, but cannot guarantee your request. You can do either of the following: Request an early or late check-in/check-out Contact the property ',
  },
];
export const creditCardsFaq = [
  {
    question: 'Can I use a debit card to complete my reservation',
    answer:
      'Generally hotels cannot accept a debit card to guarantee a booking. However, there are some exceptions. If your chosen hotel can accept a debit card, you will see this option when making your booking',
  },
  {
    question: 'Can I make a reservation without a credit card',
    answer:
      'A valid card is needed to guarantee your reservation with most properties. We do offer a number of properties, however, that will guarantee your reservation without a card. You can also make a booking using someone else’s card provided you have their permission. In this case please confirm the card holder’s name and that you have permission to use their card, in the ‘Special Requests’ box when making your booking',
  },
  {
    question: 'What’s the difference between a pre-authorisation and an actual charge to my credit card',
    answer:
      'Pre-authorisations are common but are often confused with actual charges. While in-store purchases are immediately charged and deducted from your available balance, pre-authorisations are temporary holds. The length of the hold will vary, and your credit card company can advise how they handle this',
  },
  {
    question: 'How will I know if my card has been pre-authorised',
    answer:
      'Your available balance will be reduced temporarily by the full amount of your reservation. You may also see “pending transactions” on your credit card account summary. If you’re not sure if your card had been pre-authorised, both the hotel and your credit card company can verify this.',
  },
  {
    question: 'Can I make a reservation for myself using someone else’s credit card',
    answer:
      'Yes, you can but only if you have permission from the cardholder. When you make the booking, please state that you’re using someone else’s card with their permission in the “Special requests” box. The property may require authorisation from the cardholder. Please be aware that in the case of a no-show or late cancellation, any penalties will be charged to the card provided when the booking was made',
  },
  {
    question: 'How long will the pre-authorisation hold affect my available balance',
    answer:
      'Your card provider can better explain this, along with the general terms and conditions associated with their pre-authorisation procedures. These terms vary across the board, so it’s best to contact them for specific details',
  },
  {
    question: 'Why do I need to provide my credit card details',
    answer:
      'In most cases, CityGuidesX needs credit card details to confirm your reservation with the property. Your credit card may be checked (pre-authorised) to ensure that it is valid and that sufficient funds are available. After the check, the full amount will be available to you again. In some cases, your credit card details will be used to process the payment for the reservation at the time of booking. Your credit card will only be charged if you have requested a pre-paid accommodation or if the cancellation policy, has not been followed',
  },
  {
    question: 'Will the pre-authorisation hold always equal the exact amount of my reservation',
    answer:
      'In most cases, the hotel will pre-authorise your card for the full amount of your reservation. On occasion, you may see an amount slightly higher than the rate shown on CityGuidesX. If this does happen, the hotel can explain why this has occurred',
  },
  {
    question: 'Will this happen with all bookings made through CityGuidesX',
    answer:
      "Hotels reserve the right to pre-authorise your card, but this doesn't mean it will occur with every booking. Don’t worry, if your card is pre-authorised, both the hotel and your credit card company is there to help. They may also be able to assist you with removing these holds sooner",
  },
  {
    question: 'The credit card that I used to make a booking is no longer valid. What should I do',
    answer:
      'Please update your payment details on CityGuidesX. In case your booking confirmation states that the property will handle payment, you can also contact the property directly. You can find their contact information in your booking confirmation email or when you log into CityGuidesX. For security reasons, never provide your credit card details by email',
  },
  {
    question: 'Why have I been charged',
    answer:
      'The charge you see could be any one of the following: Pre-authorisation: A pre-authorisation is just a validity check that temporarily blocks on your credit card an amount roughly equivalent to the cost of your reservation. The amount will be unblocked after a certain time period. How long this takes will depend on the property and your credit card provider. Deposit or Prepayment: Some properties require a deposit or prepayment at the time of reservation. This policy is clearly highlighted during the reservation process, and you can see it in your confirmation email as well. If you are eligible for free cancellation, this amount is returned to you if you choose to cancel your reservation. Our Customer Service team is always there for you if you need help with a payment issue. You can go to CityGuidesX /help to get in touch with us. ',
  },
  {
    question: 'What is a pre-authorisation',
    answer:
      'When you make a reservation, there may be instances where the hotel will contact your credit (or debit) card company to confirm that the card you are using is valid and hasn’t been reported lost or stolen. At this time, they may also check to see if the card has enough money to cover the transaction. This is communicated in the form of a pre-authorisation of the full amount of your reservation',
  },
  {
    question: 'Are my credit card details safe',
    answer:
      'Yes, always. CityGuidesX uses a secure connection and your personal data and credit card details are encrypted',
  },
];
export const propertyPoliciesFaq = [
  {
    question: 'What are the check-in and check-out times',
    answer:
      'Check-in and check-out times differ for each property. You can find them in the "House Rules" section on the property page when booking, in your confirmation email, and when you log into your account.',
  },
  {
    question: 'Can I request an early or late check-in',
    answer:
      'You can request an early/late check-in by specifying your intended time while making the reservation, managing your booking online, or contacting the property directly. However, the property cannot always accommodate this request.',
  },
  {
    question: "How do I find out about a property's facilities",
    answer:
      'You can see facilities under "Facilities" on the property page before booking. This includes amenities like parking, lifts, shuttle services, and luggage storage.',
  },
  {
    question: 'Are pets allowed',
    answer:
      'Pet policies are always displayed on the property\'s page under "House rules". Check this section to understand the specific pet policy for each property.',
  },
  {
    question: "What if I'm travelling with an assistance animal",
    answer:
      "CityGuidesX strives to ensure travelers with disabilities are treated respectfully. In many countries, travelers with certified assistance animals are entitled to book any accommodation without additional fees, even if there's a 'no pets' policy.",
  },
  {
    question: 'I will be arriving earlier/later than the stated check-in time. Can I still check-in',
    answer:
      "This depends on the property's policy. You can request an early/late check-in in advance, but it's not guaranteed.",
  },
];
export const communicationsFaq = [
  {
    question: 'Are my communications stored',
    answer:
      'Communications are stored by CityGuidesX and can be accessed upon request or for security purposes like fraud detection.',
  },
];
export const roomTypesFaq = [
  {
    question: "What's the difference between a Double room and a Twin room",
    answer:
      'A Double Room has one double bed, while a Twin Room has two single beds. Double/Twin rooms can be set up either way, and you can specify your preference during booking.',
  },
  {
    question: "What do 'non-refundable' and 'free cancellation' mean",
    answer:
      'Every room or property has an individual policy which is determined by the property. A “non-refundable” policy means that a fee will apply if you decide to change or cancel your booking. This fee is mentioned in the conditions during the booking process, and in the booking confirmation. A “free cancellation” policy means you can change or cancel a booking for free, as long as you do it within the time period specified by the property (for example “Cancel up to x days” or “Cancel before dd/mm/yy hh:mm”). This is mentioned in the conditions during the booking process, and in the booking confirmation. ',
  },
  {
    question: 'Can I request an extra bed',
    answer:
      'You can request an extra bed in the "Special requests" box when booking. Check the "House Rules" for any additional costs, which are not included in the reservation price.',
  },
  {
    question: 'Is it possible to get an extra bed or cot for a child',
    answer:
      "You can find information about extra beds and cots for children in the 'House Rules' on the property page when you book.  Added costs for children, if any, are not included in the reservation price. When you make a booking, you can request an extra bed or cot for a child in the “Special requests” box. If you’ve already made a booking, you can always request an extra bed or cot via the link provided in the booking confirmation email. We recommend contacting the property before you arrive to make sure they have an extra bed or cot available. You can find their contact details in the confirmation email and when you view your bookings in your account. If you need us to resend your booking confirmation email, please go to CityGuidesX /help. ",
  },
];
export const pricingFaq = [
  {
    question: 'Is breakfast included in the price',
    answer:
      'Each room or accommodation that you can book has its own breakfast policy. If breakfast is included, you will see it listed on the property page when you compare different options to book. If breakfast isn’t included, you can see if the property provides it by checking the available facilities. After you book, this information can also be found in your confirmation email, and you can see it when you view your bookings in your account.',
  },
  {
    question: 'What does the price include',
    answer:
      'All the facilities listed under the room or accommodation type are included in the price. You can also see if other things like breakfast, taxes or service charges are included when you compare different options to book. After you book, this information can also be found in your confirmation email, and you can see it when you view your bookings in your account.',
  },
  {
    question: 'Are the prices shown on CityGuidesX per person or per room',
    answer:
      'The price we show is for the room for the entire length of the stay, unless otherwise stated in the room type and description',
  },
  {
    question: 'Are taxes included in the price',
    answer:
      'This depends on the property and accommodation type, but it’s easy to see what’s included when you compare different options to book. Tax requirements change from country to country so it’s always good to check. After you book, this information can also be found in your confirmation email, and you can see it when you view your bookings in your account.',
  },
  {
    question: 'Do I pay a reservation fee to CityGuidesX',
    answer:
      'No, CityGuidesX does not charge a reservation fee. We guarantee the best available rates, so you pay the property directly. ',
  },
  {
    question: 'Can I use discount vouchers (e.g. issued by magazines, shops, etc.)',
    answer:
      'You cannot use the vouchers when booking on our website. You will have to follow the procedures described by the organisation issuing the voucher',
  },
  {
    question:
      'Does CityGuidesX offer any special consideration discounts, or discounts with airline or hotel loyalty cards',
    answer:
      'CityGuidesX provides the best available rates for the dates of your stay. It is not possible to have any further reductions on the price',
  },
  {
    question: 'Do I pay the full price for my child',
    answer:
      "You can find information about a property's children policy in the “House Rules” on the property page when you book. Added costs for children, if any, are not included in the reservation price. When you make a booking, you can request an extra bed or cot for a child in the “Special requests” box. If you’ve already made a booking, you can always request an extra bed or cot via the link provided in the booking confirmation email. We recommend contacting the property before you arrive to make sure they have an extra bed or cot available. You can find their contact details in the confirmation email and when you view your bookings in your account ",
  },
];
export const extraFacilitiesFaq = [
  {
    question: 'How do I find out about parking',
    answer:
      "You can see whether or not the property has parking under 'Rules' before you make a booking. If the property requires you to reserve a space, please contact them directly with the contact details provided in your booking confirmation",
  },
  {
    question: 'How do I find out if a property has a certain facility (e.g a lift)',
    answer:
      'Under amenities on the property page, you can see a list of all the property’s facilities, activities and services.',
  },
  {
    question: 'Does the property offer luggage storage',
    answer:
      'If available, luggage storage will be listed under "Facilities". Contact the property directly for more information.',
  },
  {
    question: 'Can I get an airport shuttle',
    answer:
      'If offered, shuttle service will be listed under "Facilities". Arrange transfers directly with the property after booking, having your flight details ready.',
  },
];
export const securityAwarenessFaq = [
  {
    question: 'What is social engineering',
    answer:
      'A scammer strategy where they pretend to be a trusted source to trick people into revealing sensitive personal data or making payments.',
  },
  {
    question: 'How can I avoid social engineering attempts',
    answer:
      'Be wary of urgent emails, spelling mistakes, suspicious links, and remember that CityGuidesX will never ask for credit card details via email, text, or phone.',
  },
  {
    question: "What should I do if I think I've been scammed",
    answer:
      'Contact CityGuidesX immediately via help center or app. Contact your payment provider to potentially dispute the charge.',
  },
];

// Misc
export const LIBS: Library[] = ['core', 'maps', 'places', 'marker'];

// Footer
export const footerLinks = [
  {
    category: 'Support',
    links: [
      { title: 'Manage your trips', href: '#' },
      { title: 'Contact Customer Service', href: paths.about('contact') },
      { title: 'Help Center', href: paths.help('helpCentre') },
      { title: 'Faq', href: paths.help('faq') },
    ],
  },
  {
    category: 'Discover',
    links: [
      { title: 'Seasonal and holiday deals', href: '#' },
      { title: 'Sign up as an establishment', href: paths.register() },
      { title: 'Stays', href: paths.stays() },
      { title: 'Restaurants', href: paths.restaurants() },
      { title: 'Night Clubs', href: paths.nightlifes() },
      { title: 'Airtime Topup', href: paths.vtu() },
    ],
  },
  {
    category: 'Terms and Settings',
    links: [
      { title: 'Privacy Policy', href: paths.help('privacy') },
      { title: 'Terms and Conditions', href: paths.help('terms') },
      { title: 'Dispute resolution', href: paths.help('dispute') },
      { title: 'Company Details', href: paths.about('company') },
    ],
  },
  {
    category: 'Partners',
    links: [
      { title: 'Manage properties', href: paths.admin() },
      { title: 'List your property', href: paths.listProperty() },
      { title: 'Admin login', href: paths.login() },
    ],
  },
  {
    category: 'About',
    links: [
      { title: 'About CityGuideX', href: paths.about() },
      { title: 'How we work', href: paths.help() },
      { title: 'Sustainability', href: '#' },
      { title: 'Press centre', href: '#' },
      { title: 'Careers', href: paths.about('careers') },
      { title: 'Corporate contact', href: paths.about('contact') },
    ],
  },
];

// VTU
export const airtimeData = [
  {
    title: 'Excellent Customer Support',
    description:
      'Our well trained customer support agents are always available 24/7 to help you resolve any issues. We provide you with multiple ways to reach us and get fast help.',
  },
  {
    title: 'Fast Service Delivery',
    description:
      'Enjoy prompt delivery of services purchased through Cityguidex. Our promise to you is to deliver value for every transaction made on-time, every time.',
  },
  {
    title: 'Safe and Secure Payment',
    description:
      'Payment on Cityguidex is fast and 100% secured. Enjoy seamless payment processes with zero glitches. Pay with wallet, bank transfer or card.',
  },
];

export const airtimeNav = [
  { title: 'Dashboard', href: '/vtu/dashboard' },
  { title: 'Transaction History', href: '/vtu/dashboard/history' },
  { title: 'Saved Receivers', href: '/vtu/dashboard/receivers' },
  { title: 'Purchase Airtime', href: '/vtu/dashboard/purchase/airtime' },
  { title: 'Purchase Data', href: '/vtu/dashboard/purchase/data' },
];

export const airtimeTransactionsColumns = [
  { key: 'user', label: 'User' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
];

export const airtimeReceiversColumns = [
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'action', label: 'Action' },
];

export const airtimeNetworks = [
  { value: ISPs.AIRTEL, label: 'AIRTEL', icon: airtel, color: '#E42424' },
  { value: ISPs.MTN, label: 'MTN', icon: mtn, color: '#FFC107' },
  { value: ISPs.GLO, label: 'GLO', icon: glo, color: '#308E34' },
  { value: ISPs.ETISALAT, label: '9MOBILE', icon: etisalat, color: '#EBEBEB' },
];
