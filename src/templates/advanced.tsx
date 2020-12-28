import React from 'react';

import { graphql, Link } from 'gatsby';
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
      <div>
        <pre><code>{JSON.stringify(props, null, '  ')}</code></pre>
      </div>
      <h1>{props.pageContext.frontmatter?.title}</h1>
      <Link to={props.pageContext?.url}>{props.pageContext?.name}</Link>
      <hr />
      <Link to="/">Return</Link>
    </Layout>
  );
};

export default Advanced;
