import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

interface ISectionHeader {
  title: string;
  desc: string;
  viewUrl?: string;
}

const SectionHeader = ({ title, desc, viewUrl }: ISectionHeader) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className=" text-accentGray font-medium">{desc}</p>
      </div>
      {viewUrl ? (
        <Button color="secondary">
          <Link href={viewUrl}>View more</Link>
        </Button>
      ) : null}
    </div>
  );
};

export default SectionHeader;
