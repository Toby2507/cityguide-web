'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface Props {
  error: string;
}

const ErrorDisplay = ({ error }: Props) => {
  useEffect(() => {
    toast.error(error);
  }, [error]);
  return null;
};

export default ErrorDisplay;
