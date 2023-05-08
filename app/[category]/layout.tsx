import React from 'react';

import Categories from '@/components/Categories';
import Profile from '@/components/Profile';

type Props = {
  children: React.ReactNode;
  params: { category: string };
};

export default function Layout({ children, params: { category } }: Props) {
  return (
    <div className="px-6">
      <Profile />
      <Categories path={category} />
      {children}
    </div>
  );
}
