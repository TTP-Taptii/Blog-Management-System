// Returns a copy of `source` containing only the listed keys that are present.
const pick = (source = {}, keys) =>
  keys.reduce((acc, key) => {
    if (source[key] !== undefined) acc[key] = source[key];
    return acc;
  }, {});

module.exports = pick;
