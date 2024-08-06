'use server';

import { ICreateStay } from '@/types';
import { fetchWithReAuth } from '@/utils';

export const uploadImages = async (body: FormData) => {
  const res = await fetchWithReAuth('account/upload', { method: 'POST', body }, true);
  const images = await res.json();
  return images.imgUrls;
};

export const createStay = async (body: ICreateStay) => {
  const res = await fetchWithReAuth('stay/create', { method: 'POST', body: JSON.stringify(body) });
  console.log(res);
  const stay = await res.json();
};
