import { LoginForm } from '@/containers';
import { paths } from '@/utils';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div>
      <h2 className="text-xl text-black font-bold pb-2">Log In to your account</h2>
      <p className="text-sm text-accentGray font-medium pb-6">
        Don&apos;t have an account?
        <Link className="text-primary font-bold hover:underline" href={paths.register()}>
          {' '}
          Sign Up
        </Link>
      </p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
