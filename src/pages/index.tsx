import React from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../components/index';

export default ({ message = 'hi' }: { message: string }) => {
  return (
    <Layout>
      <Helmet title="Home" />
      <h2>Welcome! {message}</h2>
    </Layout>
  );
};
