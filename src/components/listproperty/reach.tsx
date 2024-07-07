const ListPropertyReach = () => {
  return (
    <section id="reach" className="bg-bgGray py-16">
      <div className="container flex flex-col gap-10 px-10 mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold capitalize">Reach a unique global customer base</h2>
        <div className="grid grid-cols-3 gap-10 justify-center">
          <div className="flex flex-col items-center">
            <b className="text-5xl font-semibold">65%</b>
            <p className="text-lg">of vacation rental guests return to book with us again.</p>
          </div>
          <div className="flex flex-col items-center">
            <b className="text-5xl font-semibold">47%</b>
            <p className="text-lg">of nights booked on Cityguidex in 2024 were for international stays.</p>
          </div>
          <div className="flex flex-col items-center">
            <b className="text-5xl font-semibold">34%</b>
            <p className="text-lg">
              of vacation rental customers are Genius loyalty level 2 or 3 who tend to spend more per booking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListPropertyReach;
