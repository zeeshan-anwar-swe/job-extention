import React from 'react';

export const Item = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full">{children}</div>;
};