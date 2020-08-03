import React, { ReactNode } from 'react';

type LayoutProps = {
  children?: ReactNode;
};

export default ({ children }: LayoutProps) => {
  return (
    <div>
      <h1>Stormwild</h1>
      {children}
    </div>
  );
};
