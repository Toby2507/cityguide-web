declare module '@paystack/inline-js' {
  class PaystackPopup {
    resumeTransaction(access_code: string): void;
  }

  export = PaystackPopup;
}
