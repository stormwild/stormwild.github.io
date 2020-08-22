const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }, options) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
  }
};

exports.createPages = () => {};
