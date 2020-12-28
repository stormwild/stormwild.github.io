import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { Global } from '@emotion/core';

import 'src/scss/main.scss';

type LayoutProps = {
  children?: ReactNode;
};

export default ({ children }: LayoutProps) => {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  const head = {
    title,
    titleTemplate: `%s | ${title}`,
  };

  return (
    <>
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
      <Helmet {...head} />
      {children}
    </>
  );
};
