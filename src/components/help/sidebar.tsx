'use client';

import { helpData } from '@/data';
import { useVisibleSection } from '@/hooks';
import Link from 'next/link';
import { RefObject } from 'react';
import { IoCaretForwardOutline } from 'react-icons/io5';

interface Props {
  scrollElement: RefObject<HTMLElement>;
}

const HelpSideBar = ({ scrollElement }: Props) => {
  const visibleSection = useVisibleSection(helpData, scrollElement);
  return (
    <aside className="bg-bgGray flex flex-col pt-20 px-10 h-screen w-fit">
      <nav className="flex flex-col gap-4">
        {helpData.map(({ id, title }) => {
          const isActive = visibleSection === id;
          return (
            <Link href={`#${id}`} key={id}>
              <div className="flex items-center gap-1">
                {isActive ? <IoCaretForwardOutline size={16} className="text-blue500" /> : null}
                <p
                  className={`text-nowrap text-sm ${isActive ? 'text-blue500' : ''} font-medium ${
                    isActive ? 'underline' : 'hover:underline'
                  }`}
                >
                  {title}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default HelpSideBar;
