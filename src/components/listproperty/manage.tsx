const info = [
  { title: 'Quick Registration', content: 'Set up your property listing in minutes' },
  { title: 'Multi-property management', content: 'Manage multiple properties from a single dashboard' },
  { title: 'Real-time updates', content: 'Get instant updates on your property listing' },
  { title: 'Customize your listing', content: 'Add photos, descriptions, and other details to your property listing' },
  { title: '24/7 customer support', content: 'Get help with your property listing at any time' },
  { title: 'Transparent commission', content: 'Know exactly how much you pay in commission fees' },
];

const ListPropertyManage = () => {
  return (
    <section className="container flex flex-col gap-10 px-10 py-20 mx-auto max-w-7xl">
      <h2 className="text-4xl font-semibold capitalize">Manage your properties with ease</h2>
      <div className="grid grid-cols-2 items-center gap-10">
        {info.map(({ title, content }, i) => (
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
