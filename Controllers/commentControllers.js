const Comment = require('../Models/commentModel')
const User = require('../Models/UserModel')
const addComment = async (req, res) => {
    try {
        let id = req.user
        let user = await User.findOne({ _id: id })
        let { body, blogId } = req.body
        let comment = new Comment({
            user: user.name,
            blog_id: blogId,
            body: body
        })
        await comment.save()
        let comments = await Comment.find({ blog_id: blogId })
        res.status(200).json({ comments: comments })
    } catch (error) {
        res.status(404).josn({ error: error.message })
    }
}



const deleteComm = async (req, res) => {
    try {
        let id = req.params.id
        let comm = await Comment.findOne({ _id: id })
        let blog_id = comm.blog_id
        await Comment.deleteOne({ _id: id })
        console.log("deleted")
        let comments = await Comment.find({ blog_id })
        res.status(200).json({ comments })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = { addComment, deleteComm }
