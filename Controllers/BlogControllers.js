let Blog = require('../Models/BlogModel')
let Comment = require('../Models/commentModel')
let url = "https://blog-it-pvqc.onrender.com/uploads/"
const uploadImage = async (req, res) => {
    try {
        let { title, description } = req.body
        let blog = new Blog({
            title,
            image: `${url}${req.file.filename}`,
            description,
            author: req.user
        })
        await blog.save()
        res.status(200).json({ message: "blog saved successfully", image: blog.image })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
const getBlog = async (req, res) => {
    let id = req.params.id
    let blog = await Blog.findOne({ _id: id })
    res.status(200).json(blog)
}


const updatePost = async (req, res) => {
    try {
        let id = req.params.id
        let post = await Blog.findOne({ _id: id })
        console.log(post)
        if (!post) {
            return res.status(404).json({ message: "Blog not exists" })
        }
        await Blog.findByIdAndUpdate({ _id: id }, { $set: { ...req.body, image: post.image } })
        return res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteOne = async (req, res) => {
    try {
        let id = req.params.id
        let post = await Blog.findOne({ _id: id })
        if (!post) {
            return res.status(404).json({ error: "blog not exists" })
        }
        await Blog.deleteOne({ _id: id })
        await Comment.deleteMany({blog_id:id})
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { uploadImage, getBlog, updatePost, deleteOne }
