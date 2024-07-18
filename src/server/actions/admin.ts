'use server';

import { fetchWithReAuth } from '@/utils';

export const uploadImages = async (body: FormData) => {
  const res = await fetchWithReAuth('account/upload', { method: 'POST', body });
  const images = await res.json();
  return images.imgUrls;
};
