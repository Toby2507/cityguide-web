import { HeaderNav } from '@/components';
import { OtpForm } from '@/containers';

interface IOtpPage {
  params: {
    email: string;
  };
}

const OtpPage = ({ params: { email } }: IOtpPage) => {
  const [domain, rest] = email.split('%40');
  const hiddenEmail = `${domain.slice(0, 2)}${'*'.repeat(domain.slice(2).length)}@${rest}`;
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-primary">
        <div className="container mx-auto px-4 pt-2 max-w-7xl">
          <HeaderNav noAuth />
        </div>
      </div>
      <main className="container mx-auto flex flex-col justify-center gap-4 px-4 py-14 max-w-2xl">
        <div>
          <h1 className="text-3xl text-black text-center font-bold pb-2">OTP Verification</h1>
          <p className="text-sm text-accentGray text-center font-medium pb-6">
            Enter OTP code sent to <span className="text-primary">{hiddenEmail}</span>
          </p>
        </div>
        <OtpForm />
      </main>
    </div>
  );
};

export default OtpPage;
