import { Skeleton } from '@nextui-org/react';

const SearchCardLoader = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <article className="grid grid-cols-10 gap-4 border rounded-xl p-2 bg-white shadow-lg" key={i}>
            <Skeleton className="col-span-3 h-full w-full rounded-xl" />
            <div className="col-span-7 flex flex-col gap-1 pr-1">
              <Skeleton className="h-6 w-14 rounded-lg" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-6 w-12" />
                </div>
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </article>
        ))}
    </div>
  );
};

export default SearchCardLoader;
