const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary');


exports.registerController = async (req, res) => {
    let { firstName, lastName, email, password } = req.body;

    try {
        const isUser = await User.findOne({ email: email });
        if (isUser) {
            return res.status(404).json({
                success: false,
                message: 'User already exist.'
            })
        }
        const hashedPass = await bcrypt.hash(password, 10);

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPass
        }
        if (req.body.isAdmin) {
            userData.isAdmin = true
        }

        const user = new User(userData);
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Registration Successful'
        });
    } catch (error) {
        console.log(error);
    }
}



exports.loginController = async (req, res) => {
    let { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Email.'
            });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(404).json({
                success: false,
                message: 'Wrong Password.'
            });
        }

        const userData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin
        }

        jwt.sign(
            userData,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) {
                    return res.status(404).json({
                        success: false,
                        message: err
                    })
                } else {
                    return res.status(200).json({
                        success: true,
                        message: 'Login Successful',
                        token,
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        profilePic:user.profilePic ? user.profilePic : '',
                        address:user.address ? user.address : '',
                        birthDate:user.birthDate ? user.birthDate : '',
                        phone:user.phone ? user.phone : ''
                    });
                }
            }
        )


    } catch (error) {
        console.log(error);
    }
}


exports.editProfileController = async(req,res)=>{
    const {firstName , lastName  , birthDate, address , phone} = req.body;
    const userId = req.params.userId;

    try {
        const user = await User.findOne({_id:userId});
        if(!user){
            return res.status(404).json({
                success:false,
                message:'No user found!'
            })
        }
        let userInfo = {
            firstName,
            lastName,
            address,
            birthDate,
            phone
        }

        if(req.file){
            let filePath = await cloudinary.uploader.upload(req.file.path)
            userInfo.profilePic = filePath.secure_url;
        }
        const updatedUser = await User.findOneAndUpdate({_id:userId} ,userInfo,{new:true});

        res.status(200).json(updatedUser);
        
    } catch (error) {
        console.log(error)
    }
}