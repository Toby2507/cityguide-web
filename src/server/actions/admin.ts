'use server';

import { ICreateStay } from '@/types';
import { fetchWithReAuth, formatStayBody } from '@/utils';

export const uploadImages = async (body: FormData) => {
  const res = await fetchWithReAuth('account/upload', { method: 'POST', body }, true);
  const images = await res.json();
  return images.imgUrls;
};

export const createStay = async (body: ICreateStay) => {
  const data = formatStayBody(body);
  await fetchWithReAuth('property/stay', { method: 'POST', body: JSON.stringify(data) });
};
