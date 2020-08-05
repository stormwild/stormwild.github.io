import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

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
    title: title,
    titleTemplate: `%s | ${title}`,
  };

  return (
    <>
      <Helmet {...head} />
      <div>
        <h1>Stormwild</h1>
        {children}
      </div>
    </>
  );
};
