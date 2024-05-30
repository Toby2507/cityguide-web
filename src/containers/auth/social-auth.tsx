// import { signInWithGoogle } from '@/server';
import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdFacebook } from 'react-icons/md';

const SocialAuth = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-accentGray text-xs font-medium">Or sign in with social account</p>
      <div className="flex items-center gap-4">
        {/* <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login/google`}> */}
        <Button
          // onClick={signInWithGoogle}
          className="w-12 h-12 bg-white shadow-lg"
          radius="full"
          isIconOnly
          aria-label="sign in with google"
        >
          <FcGoogle size={20} />
        </Button>
        {/* </Link> */}
        <Button className="w-12 h-12 bg-primary shadow-lg" radius="full" isIconOnly aria-label="sign in with facebook">
          <MdFacebook color="white" size={20} />
        </Button>
      </div>
      <Link href={paths.userLicense()}>
        <p className="text-sm text-primary font-medium hover:underline">Read user license & agreement</p>
      </Link>
    </div>
  );
};

export default SocialAuth;
