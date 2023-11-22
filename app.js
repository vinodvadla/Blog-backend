const app = require("./Middlewares/middlewares");
const Blog = require('./Models/BlogModel')
const Comment = require('./Models/commentModel')



app.get('/all', async (req, res) => {
  let blogs = await Blog.find({})
  res.status(200).json(blogs)
})
app.get('/singleblog/:id', async (req, res) => {
  let id = req.params.id
  let comments = await Comment.find({ blog_id: id })
  let blog = await Blog.findById({ _id: id })
  res.status(200).json({ blog, comments })
})
app.listen(process.env.PORT, () => {
  console.log("server running on 5000");
});
