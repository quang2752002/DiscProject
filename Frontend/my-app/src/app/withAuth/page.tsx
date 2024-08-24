"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (!token) {
            router.push('/login');
          } else {
            setIsLoading(false);
          }
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return <p>Loading...</p>; // or a spinner/loading component
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
