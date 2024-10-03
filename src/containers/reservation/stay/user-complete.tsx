import { IStay } from '@/types';

const UserCompleteReservation = ({ type }: IStay) => {
  return (
    <section className="flex flex-col gap-2">
      <article className="flex flex-col gap-1 border-2 rounded-xl px-6 py-4">
        <h3 className="text-lg font-bold tracking-wide">You&apos;ll pay at the property</h3>
        <p>Your card won&apos;t be charged - we only need your card to guarantee your booking.</p>
      </article>
    </section>
  );
};

export default UserCompleteReservation;
