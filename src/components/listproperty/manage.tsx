import { manage } from '@/data';

const ListPropertyManage = () => {
  return (
    <section className="container flex flex-col gap-10 px-10 py-20 mx-auto max-w-7xl">
      <h2 className="text-4xl font-semibold capitalize">Manage your properties with ease</h2>
      <div className="grid grid-cols-2 items-center gap-10">
        {manage.map(({ title, content }, i) => (
          <div key={i} className="flex flex-col">
            <b className="text-2xl font-medium">{title}</b>
            <p className="text-base">{content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListPropertyManage;
