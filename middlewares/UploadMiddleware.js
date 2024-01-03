const multer = require("multer");
const fs = require("fs");

class UploadMiddleware {
    static initializeUpload() {
        const path = "./public";
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "./public");
            },
            filename: function (req, file, cb) {
                const fileName = file.originalname.toLowerCase().split(" ").join("-");
                cb(null, Date.now() + "-" + fileName);
            },
        });

        return multer({ storage: storage, limits: { fileSize: 10000000 } });
    }
}

module.exports = UploadMiddleware;
