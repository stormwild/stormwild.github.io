const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const keyBy = (array, key) =>
  (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

const dataKeyBy = (data, key) => {
  const d = data || {};
  return Array.isArray(d) ? keyBy(d, key) : Object.values(keyBy(d, key));
};

const get = (obj, path, defaultValue = undefined) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

function findFileNode({ node, getNode }) {
  let fileNode = node;
  let ids = [fileNode.id];

  while (fileNode && fileNode.internal.type !== `File` && fileNode.parent) {
    fileNode = getNode(fileNode.parent);

    if (!fileNode) {
      break;
    }

    if (ids.includes(fileNode.id)) {
      console.log(`found cyclic reference between nodes`);
      break;
    }

    ids.push(fileNode.id);
  }

  if (!fileNode || fileNode.internal.type !== `File`) {
    console.log('did not find ancestor File node');
    return null;
  }

  return fileNode;
}

exports.onCreateNode = ({ node, getNode, actions }, options) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    let fileNode = findFileNode({ node, getNode });
    if (!fileNode) {
      throw new Error(
        'could not find parent File node for MarkdownRemark node: ' + node
      );
    }

    let url = createFilePath({ node, getNode });

    createNodeField({ node, name: 'url', value: url });
    createNodeField({
      node,
      name: 'absolutePath',
      value: fileNode.absolutePath,
    });
    createNodeField({
      node,
      name: 'relativePath',
      value: fileNode.relativePath,
    });
    createNodeField({ node, name: 'absoluteDir', value: fileNode.dir });
    createNodeField({
      node,
      name: 'relativeDir',
      value: fileNode.relativeDirectory,
    });
    createNodeField({ node, name: 'base', value: fileNode.base });
    createNodeField({ node, name: 'ext', value: fileNode.ext });
    createNodeField({ node, name: 'name', value: fileNode.name });
  }
};

exports.createPages = ({ graphql, getNode, actions, getNodesByType }) => {
  const { createPage, deletePage } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            html
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const nodes = result.data.allMarkdownRemark.edges.map(({ node }) => node);
    const siteNode = getNode('Site');
    const siteDataNode = getNode('SiteData');
    const sitePageNodes = getNodesByType('SitePage');
    const sitePageNodesByPath = dataKeyBy(sitePageNodes, 'path');
    // console.log(`sitePageNodesByPath: ${JSON.stringify(sitePageNodesByPath)}`);
    // console.log(`siteDataNode: ${JSON.stringify(siteDataNode)}`);
    // const siteData = get(siteDataNode, 'data', {});

    const pages = nodes.map(graphQLNode => {
      // Use the node id to get the underlying node. It is not exactly the
      // same node returned by GraphQL, because GraphQL resolvers might
      // transform node fields.
      const node = getNode(graphQLNode.id);
      return {
        url: node.fields.url,
        relativePath: node.fields.relativePath,
        relativeDir: node.fields.relativeDir,
        base: node.fields.base,
        name: node.fields.name,
        frontmatter: node.frontmatter,
        html: graphQLNode.html,
      };
    });

    nodes.forEach(graphQLNode => {
      const node = getNode(graphQLNode.id);
      const url = node.fields.url;
      const template = node.frontmatter.template;
      const component = path.resolve(`./src/templates/${template}.tsx`);
      const existingPageNode = get(sitePageNodesByPath, url);

      // const { 'site-metadata', ...rest } = siteData;

      const page = {
        path: url,
        component: component,
        context: {
          url: url,
          relativePath: node.fields.relativePath,
          relativeDir: node.fields.relativeDir,
          base: node.fields.base,
          name: node.fields.name,
          frontmatter: node.frontmatter,
          html: graphQLNode.html,
          pages: pages,
          site: {
            // siteMetadata: get(siteData, 'site-metadata', {}),
            pathPrefix: siteNode.pathPrefix,
            // data: _.omit(siteData, 'site-metadata'),
          },
        },
      };

      if (existingPageNode && !get(page, 'context.menus')) {
        page.context.menus = get(existingPageNode, 'context.menus');
      }

      createPage(page);
    });
  });
};
