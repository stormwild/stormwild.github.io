import React from 'react';

import { graphql } from 'gatsby';
import { Layout } from '../components';

export const query = graphql`
  query($url: String) {
    sitePage(path: { eq: $url }) {
      id
    }
  }
`;

const Advanced = (props: any) => {
  return (
    <Layout>
      <h1>{props.pageContext.frontmatter.title}</h1>
    </Layout>
  );
};

export default Advanced;
