import React from 'react';
import { Link, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Global } from '@emotion/core';

import { Layout } from '../components/index';
import Greeting from '../components/Greeting';

type QueryResult = { data: any };

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          excerpt
          html
        }
      }
    }
  }
`;

export default ({ data }: QueryResult) => {
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
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }: { node: any }) => (
          <li key={node.id}>
            <h3>{node.frontmatter.title}</h3>
            <p>{node.excerpt}</p>
            <pre>{node.html}</pre>
            <Link to={node.url}></Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
