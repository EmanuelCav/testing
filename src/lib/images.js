import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public")
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname)
    }
})

export const upload = multer({
    storage,
    limits: {
        fieldSize: 1000 * 1000
    }
})