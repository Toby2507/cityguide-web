import { ListPropertyReach, ListPropertyRetain } from '@/components';
import ListPropertyQuality from '@/components/listproperty/quality';
import { Footer, ListPropertyHeader } from '@/containers';

const ListPropertyPage = () => {
  return (
    <>
      <ListPropertyHeader />
      <main className="flex flex-col bg-white">
        <ListPropertyReach />
        <ListPropertyQuality />
        <ListPropertyRetain />
      </main>
      <Footer />
    </>
  );
};

export default ListPropertyPage;
