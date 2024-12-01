import { SectionHeader } from '@/components';
import { DiscoverHome, Footer, Header } from '@/containers';
import { aboutData1, aboutData2 } from '@/data';

const AboutPage = () => {
  return (
    <div>
      <Header noBottomSpace />
      <main className="flex flex-col gap-14 bg-white pb-20">
        <div className="container mx-auto px-10 py-10 flex flex-col gap-10 max-w-7xl">
          <SectionHeader title="About CityguideX" desc="" />
          <div className="flex flex-col gap-6">
            {aboutData1.map((data, idx) => (
              <p className="text-lg" key={idx.toString()}>
                {data}
              </p>
            ))}
          </div>
        </div>
        <DiscoverHome />
        <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
          {aboutData2.map((data, idx) => (
            <p className="text-lg" key={idx.toString()}>
              {data}
            </p>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
