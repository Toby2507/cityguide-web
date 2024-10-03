import { NightlifeDetailNav } from '@/components';
import { Footer, Header, NightlifeDetailContainer } from '@/containers';
import { getNightlifeById } from '@/server';
import { QueryClient } from '@tanstack/react-query';
import React from 'react';

interface Props {
  params: {
    nightlifeId: string;
  };
}

const NightlifeDetailPage = async ({ params: { nightlifeId } }: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['nightlife', nightlifeId],
    queryFn: async () => await getNightlifeById(nightlifeId),
  });
  return (
    <>
      <Header />
      <main className="flex flex-col gap-20 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
          <NightlifeDetailNav />
          <NightlifeDetailContainer nightlifeId={nightlifeId} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NightlifeDetailPage;
