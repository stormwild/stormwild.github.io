exports.get = (obj, path, defaultValue = undefined) => {
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

exports.keyBy = (array, key) =>
  (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

exports.dataKeyBy = (data, key) => {
  const d = data || {};
  return Array.isArray(d) ? keyBy(d, key) : Object.values(keyBy(d, key));
};

exports.findFileNode = ({ node, getNode }) => {
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
};
