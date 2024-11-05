import { AirtimeHeader, AirtimeSidebar } from '@/containers';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const AirtimeLayout = ({ children }: Readonly<IProps>) => {
  return (
    <div className="relative bg-white max-h-screen">
      <AirtimeHeader />
      <div className="flex">
        <AirtimeSidebar />
        <main className="px-10 pt-28 pb-4 h-screen overflow-y-auto w-full adminmain">{children}</main>
      </div>
    </div>
  );
};

export default AirtimeLayout;
