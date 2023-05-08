import React from 'react';

import CategoryList from '@/components/CategoryList';
import Profile from '@/components/Profile';

type Props = {
  children: React.ReactNode;
  params: { category: string };
};

export default function Layout({ children, params: { category } }: Props) {
  return (
    <div className="px-6">
      <Profile />
      <CategoryList path={category} />
      {children}
    </div>
  );
}
