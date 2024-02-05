const transformIdListToStringList = (list) => {
  const stringList = list.map((objectId) => objectId.toString());
  return [...new Set(stringList)];
};

module.exports = {
  transformIdListToStringList,
};
