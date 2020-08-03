import React from 'react';
import { Layout } from '../components/index';

import 'src/scss/main.scss';

export default ({ message = 'hi' }: { message: string }) => {
  return (
    <Layout>
      <div>Hello world! {message} </div>
      <div>yo</div>
    </Layout>
  );
};
