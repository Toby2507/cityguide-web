import { HeaderNav, SignUpTab } from '@/components';
import { paths } from '@/utils';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-primary">
        <div className="container mx-auto px-4 pt-2 max-w-7xl">
          <HeaderNav noAuth />
        </div>
      </div>
      <main className="container mx-auto flex flex-col justify-center gap-1 px-4 py-10 max-w-2xl">
        <div>
          <h1 className="text-3xl text-black text-center font-bold pb-2">Create an account</h1>
          <p className="text-sm text-accentGray text-center font-medium pb-6">
            Already have an account?
            <Link className="text-primary font-bold hover:underline" href={paths.login()}>
              {' '}
              Sign In
            </Link>
          </p>
        </div>
        <SignUpTab />
      </main>
    </div>
  );
};

export default SignUpPage;
