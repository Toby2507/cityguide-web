import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdFacebook } from 'react-icons/md';

interface IFormFooter {
  isSignUp?: boolean;
  noSocial?: boolean;
}

const FormFooter = ({ noSocial, isSignUp = false }: IFormFooter) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {!noSocial ? (
        <>
          <p className="text-accentGray text-xs font-medium">or sign {isSignUp ? 'up' : 'in'} with social account</p>
          <div className="flex items-center gap-4">
            <Button className="w-14 h-14 bg-white shadow-lg" radius="full" isIconOnly aria-label="sign in with google">
              <FcGoogle size={24} />
            </Button>
            <Button
              className="w-14 h-14 bg-primary shadow-lg"
              radius="full"
              isIconOnly
              aria-label="sign in with facebook"
            >
              <MdFacebook color="white" size={24} />
            </Button>
          </div>
        </>
      ) : null}
      <div className="flex flex-col justify-center gap-4">
        <p className="text-sm text-accentGray text-center font-normal mx-auto w-9/12">
          By signing in or creating an account, you agree with our{' '}
          <Link className="text-primary hover:underline" href={paths.userLicense()}>
            Terms and Agreement
          </Link>{' '}
          and{' '}
          <Link className="text-primary hover:underline" href={paths.userLicense()}>
            Privacy Policy
          </Link>
        </p>
        <small className="text-xs text-accentGray text-center">
          All rights reserved
          <br />
          &copy;{new Date().getFullYear()} - CityGuideX.com
        </small>
      </div>
    </div>
  );
};

export default FormFooter;
