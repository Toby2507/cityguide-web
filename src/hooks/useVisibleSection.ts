'use client';

import { helpData } from '@/data';
import { throttle } from 'lodash';
import { RefObject, useCallback, useEffect, useState } from 'react';

const useVisibleSection = (sections: typeof helpData, element?: RefObject<HTMLElement>) => {
  const [visibleSection, setVisibleSection] = useState<string>('');

  const isSectionVisible = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return false;
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };
  const checkVisibility = useCallback(() => {
    for (const { id } of sections) {
      if (isSectionVisible(id)) {
        setVisibleSection(id);
        break;
      }
    }
  }, [sections]);

  useEffect(() => {
    if (typeof window !== undefined) {
      const throttledCheck = throttle(checkVisibility, 300);
      const mainElement = element?.current ?? window;
      mainElement.addEventListener('scroll', throttledCheck);
      checkVisibility();
      return () => mainElement.removeEventListener('scroll', throttledCheck);
    }
  }, [sections, element, checkVisibility]);

  return visibleSection;
};

export default useVisibleSection;
