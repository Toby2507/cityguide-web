import { IAddress } from '@/types';
import { KeyboardEvent } from 'react';
import toast from 'react-hot-toast';

export const addressFormatter = (res: google.maps.places.PlaceResult): IAddress => {
  return {
    name: res.name!,
    fullAddress: res.formatted_address,
    locationId: res.place_id!,
    city: res.address_components?.find((comp) => comp.types.includes('administrative_area_level_2'))?.long_name,
    state: res.address_components?.find((comp) => comp.types.includes('administrative_area_level_1'))?.long_name || '',
    country: res.address_components?.find((comp) => comp.types.includes('country'))?.long_name || '',
    geoLocation: { lat: res.geometry?.location?.lat()!, lng: res.geometry?.location?.lng()! },
  };
};

export const numberFormat = (number: number) => {
  number = number || 0;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const numberToCurrency = (value: number, prefix: boolean = false) => {
  const number = (value || 0).toFixed(2);
  const [currency, decimal] = number.split('.');
  if (prefix && value < 1000000) return `₦${Math.ceil(value / 1000)}K`;
  if (prefix && value >= 1000000) return `₦${Math.ceil(value / 1000000)}M`;
  return `₦${numberFormat(+currency)}.${decimal}`;
};

export const onEnter = (e: KeyboardEvent<HTMLInputElement>, cb: Function) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    cb();
  }
};

export const formatFileSize = (size: number) => {
  if (size === 0) return '0 Bytes';
  const k = 1000;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(0)) + ' ' + sizes[i];
};

// const checkAspectRatio = (w: number, h: number) => {
//   const ar = w / h;
//   const commons = [1, 4 / 3, 3 / 2, 16 / 9, 1.85, 2.35];
//   return commons.some((c) => Math.abs(ar - c) / c <= 0.05);
// };
// const calcBpp = (s: number, w: number, h: number, format: string) => {
//   const bpp = s / (w * h);
//   console.log(bpp);
//   if (['jpeg', 'jpg'].includes(format)) {
//     if (bpp >= 1) return 20;
//     if (bpp >= 0.5) return 10;
//   } else if (format === 'png') {
//     if (bpp >= 1.5) return 20;
//     if (bpp >= 0.75) return 10;
//   } else if (format === 'bmp') {
//     if (bpp >= 2) return 20;
//     if (bpp >= 1) return 10;
//   } else {
//     if (bpp >= 1.5) return 20;
//     if (bpp >= 0.75) return 10;
//   }
//   return 0;
// };
// export const assessImgQuality = async (file: File) => {
//   const { width, height } = await createImageBitmap(file);
//   const size = file.size;
//   const format = file.type.split('/')[1];
//   const targetSize = 640;
//   let quality = 0;

//   if (width >= targetSize && height >= targetSize) quality += 40;
//   else quality += [width, height].some((d) => d >= targetSize) ? 20 : 10;

//   const ppi = Math.sqrt(width ** 2 + height ** 2) / 9;
//   if (ppi >= 300) quality += 30;
//   else if (ppi >= 150) quality += 15;

//   quality += calcBpp(size, width, height, format);
//   quality += checkAspectRatio(width, height) ? 10 : 0;

//   return { width, height, size, quality };
// };

export const fileToImageData = (file: File): Promise<ImageData> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(toast.error('Could not get image data'));
          return;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        resolve(imageData);
      };
      img.onerror = () => {
        reject(toast.error('Could not load image'));
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(toast.error('Could not reader file'));
    };
    reader.readAsDataURL(file);
  });
