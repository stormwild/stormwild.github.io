import React from 'react';
import { Helmet } from 'react-helmet';
import { Global } from '@emotion/core';

import { Link, graphql } from 'gatsby';
import { Layout } from '../components';
import Greeting from '../components/Greeting';

export const query = graphql`
  query($url: String) {
    sitePage(path: { eq: $url }) {
      id
    }
  }
`;

const Index = (props: any) => {
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
      <h1>{props.pageContext.frontmatter.title}</h1>
      <p>Count: {props.pageContext.pages.length} || 0 </p>
      {/* <p>
        <pre>{JSON.stringify(props.pageContext.pages)}</pre>
      </p> */}
      <ul>
        <li>yo</li>
        {props.pageContext.pages.map((page: any) => {
          return (
            <li>
              {/* <pre>{JSON.stringify(page)}</pre> */}
              <Link to={page.url}>{page.name}</Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Index;
