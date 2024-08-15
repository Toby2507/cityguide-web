import { HeaderNav } from '@/components';
import { UpgradeToPartnerForm, UserSignupForm } from '@/containers';
import { getUser } from '@/server';
import { paths } from '@/utils';

const ListPropertyRegister = async () => {
  const user = await getUser();
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-primary">
        <div className="container mx-auto px-4 pt-2 max-w-7xl">
          <HeaderNav noList />
        </div>
      </div>
      <main className="container mx-auto flex flex-col justify-center gap-4 px-4 py-14 max-w-2xl">
        <div>
          <h1 className="text-3xl text-black text-center font-bold pb-2">Create your partner account</h1>
          <p className="text-sm text-accentGray text-center font-medium pb-6">
            Create an account to list and manage your property.
          </p>
        </div>
        {!!user ? <UpgradeToPartnerForm /> : <UserSignupForm isPartnering referer={paths.admin()} />}
      </main>
    </div>
  );
};

export default ListPropertyRegister;
