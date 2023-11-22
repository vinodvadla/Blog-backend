const mongoose = require('mongoose')


let comentSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})



let Comment = mongoose.model('Comment', comentSchema)


module.exports = Comment
