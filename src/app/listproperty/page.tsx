import { ListPropertyManage, ListPropertyReach, ListPropertyRetain, ListPropertyTestimonials } from '@/components';
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
        <ListPropertyManage />
        <ListPropertyTestimonials />
      </main>
      <Footer />
    </>
  );
};

export default ListPropertyPage;
