import React from 'react';
import { Layout } from '../components';
import { Link } from 'gatsby';

const NotFound = () => (
  <Layout>
    <h1>Not Found</h1>
    <p>That page doesn't exist</p>
    <Link to="/">Return</Link>
  </Layout>
);

export default NotFound;
