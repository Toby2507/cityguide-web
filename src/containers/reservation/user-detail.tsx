import { IUserDetails } from '@/types';
import { paths } from '@/utils';
import Link from 'next/link';
import { PiUserLight } from 'react-icons/pi';

interface Props {
  user: IUserDetails | null;
}

const UserDetailReservation = ({ user }: Props) => {
  return (
    <section className="flex flex-col gap-2">
      <article className="flex flex-col gap-3 border-2 rounded-xl p-3">
        {user ? (
          <p>hello</p>
        ) : (
          <div className="flex items-center gap-3">
            <PiUserLight className="text-primary" size={24} />
            <p className="text-sm">
              <Link className="text-primary" href={paths.login()}>
                Log in
              </Link>
              &nbsp;to continue with your saved details or&nbsp;
              <Link className="text-primary" href={paths.register()}>
                register
              </Link>
              &nbsp;to manage your reservations on the go.
            </p>
          </div>
        )}
      </article>
    </section>
  );
};

export default UserDetailReservation;
