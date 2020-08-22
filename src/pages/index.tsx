import React from 'react';
import { Helmet } from 'react-helmet';
import { Global } from '@emotion/core';

import { Layout } from '../components/index';
import Greeting from '../components/Greeting';

export default () => {
  return (
    <Layout>
      <Global
        styles={() => ({
          html: {
            boxSizing: 'border-box',
          },
          '*': {
            boxSizing: 'inherit',
          },
          '*:before': {
            boxSizing: 'inherit',
          },
          '*:after': {
            boxSizing: 'inherit',
          },
        })}
      />
      <Helmet title="Home" />
      <Greeting />
    </Layout>
  );
};
