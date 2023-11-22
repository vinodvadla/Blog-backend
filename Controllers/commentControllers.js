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
        res.status(200).json({ message: "Commented Successfully" })

    } catch (error) {
        res.status(404).josn({ error: error.message })
    }
}


module.exports = { addComment }
