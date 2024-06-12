import { OtpForm } from '@/containers';

interface IOtpPage {
  params: {
    email: string;
  };
}

const OtpPage = ({ params: { email } }: IOtpPage) => {
  console.log(email);
  const [domain, rest] = email.split('%40');
  const hiddenEmail = `${domain.slice(0, 2)}${'*'.repeat(domain.slice(2).length)}@${rest}`;
  return (
    <div>
      <h2 className="text-xl text-black text-center font-bold pb-2">OTP Verification</h2>
      <p className="text-sm text-accentGray text-center font-medium pb-6">
        Enter OTP code sent to <span className="text-primary">{hiddenEmail}</span>
      </p>
      <OtpForm />
    </div>
  );
};

export default OtpPage;
