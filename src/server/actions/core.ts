'use server';

import { revalidatePath } from 'next/cache';

export const refetchPage = async (path: string) => {
  revalidatePath(path);
};
