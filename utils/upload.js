const { GridFsStorage } = require('multer-gridfs-storage')
const multer = require('multer')
const storage = new GridFsStorage({
    url: "mongodb+srv://vinodvinod0979:vinod7144@cluster0.xpol920.mongodb.net/?retryWrites=true&w=majority",
    options: { useNewUrlParser: true },
    file: (req, file) => {
        const match = ["image/jpg", "image/png"]
        if (match.indexOf(file.memeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`
        }
        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

module.exports = multer({ storage })
