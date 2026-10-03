const blogRules = {
  title: { required: true, type: 'string', min: 3, max: 150 },
  content: { required: true, type: 'string', min: 10 },
  authorName: { type: 'string', min: 2, max: 60 }, // optional: defaults to the logged-in user's name
  tags: { type: 'array' },
  blogImage: { type: 'string', max: 500 },
};

module.exports = { blogRules };
