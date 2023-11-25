const express = require('express')
const { uploadImage, getBlog, updatePost, deleteOne } = require('../Controllers/BlogControllers')
const { addComment, deleteComm } = require('../Controllers/commentControllers')
let router = express.Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })
router.post('/upload', upload.single("file"), uploadImage)
router.get("/:id", getBlog)
router.put('/update/:id', updatePost)
router.delete('/delete/:id', deleteOne)
router.post('/comment', addComment)
router.delete('/comment/:id', deleteComm)
module.exports = router
