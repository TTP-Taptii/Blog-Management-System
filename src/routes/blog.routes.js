const router = require('express').Router();
const { createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog } = require('../controllers/blog.controller');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { blogRules } = require('../validators/blog.validator');

router.use(protect); // every blog route requires a valid JWT

router.route('/').get(getAllBlogs).post(validate(blogRules), createBlog);
router
  .route('/:id')
  .get(getBlog)
  .put(validate(blogRules, { partial: true }), updateBlog)
  .delete(deleteBlog);

module.exports = router;
