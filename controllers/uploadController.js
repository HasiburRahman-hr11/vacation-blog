const cloudinary = require('../utils/cloudinary');

exports.postImageUploadController = async (req,res) => {
    try {
        if(req.file){
            let filePath = await cloudinary.uploader.upload(req.file.path)
            return res.status(200).json({
                imgUrl: filePath.secure_url
            });
        }
    
        return res.status(500).json({
            message: 'Internal server error!'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message });
    }
}