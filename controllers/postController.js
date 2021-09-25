const Post = require('../models/Post');
const cloudinary = require('../utils/cloudinary');
const readingTime = require('reading-time');


// Create a New Post
exports.createPostController = async (req, res) => {
    try {

        let readTime = null;
        if (req.body.description) {
            readTime = readingTime(req.body.description).text;
        }
        let categoryArr = req.body.categories.split(',');
        let smallCatArr = categoryArr.map(cat => cat.toLowerCase());
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            categories: smallCatArr,
            readTime: readTime
        })
        if (req.file) {
            let filePath = await cloudinary.uploader.upload(req.file.path)
            newPost.thumbnail = filePath.secure_url;
        }

        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message });
    }
}


// Edit Post
exports.editPostController = async (req,res) => {
    const postId = req.params.postId;
    const {title,description,categories} = req.body
    try {

        const post = await Post.findOne({_id:postId});
        if(!post){
            return res.status(404).json({
                message:'Post not found!'
            })
        }

        let readTime = null;
        if (req.body.description) {
            readTime = readingTime(req.body.description).text;
        }
        
        let newThumbnail = '';
        if (req.file) {
            let filePath = await cloudinary.uploader.upload(req.file.path)
            newThumbnail = filePath.secure_url;
        }

        let categoryArr = categories.split(',');
        let smallCatArr = categoryArr.map(cat => cat.toLowerCase());

        const updatedPost = await Post.findOneAndUpdate({_id:postId} , {
            title: title,
            description: description,
            categories: smallCatArr,
            readTime: readTime,
            thumbnail: newThumbnail ? newThumbnail : post.thumbnail
        }, {new:true});

        

        res.status(201).json(updatedPost);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}



// Delete Post
exports.deletePostController = async(req,res)=>{
    const postId = req.params.postId
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                message: 'Post not found!'
            })
        }

        await Post.findOneAndDelete({_id:postId});

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}



// Get All Posts
exports.getAllPostsController = async (req, res) => {
    let currentPage = Number.parseInt(req.query.page , 10) || 1;
    let itemPerPage = Number.parseInt(req.query.limit , 10) || 12 ;
    try {
        const posts = await Post.find()
        .sort( { createdAt : -1} )
        .skip((itemPerPage*currentPage) - itemPerPage)
        .limit(itemPerPage)

        let totalPosts = await Post.countDocuments()
        let totalPage = Math.ceil(totalPosts / itemPerPage);

        if(currentPage > totalPage){
            return res.status(404).json({
                message: 'No Page Found.'
            })
        }

        res.status(200).json({
            posts:posts,
            totalPage:totalPage,
            currentPage:currentPage
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


//get all posts without agination
exports.getAllPostsWPController = async (req , res) =>{
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

// Get Single Post
exports.getSinglePostController = async (req, res) => {
    const postId = req.params.postId
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                message: 'Post not found!'
            })
        }
        await Post.findOneAndUpdate({_id:postId} , {views:post.views+1})

        res.status(200).json(post);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


// Get Edit Post
exports.getEditPostController = async (req, res) => {
    const postId = req.params.postId
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                message: 'Post not found!'
            })
        }
        res.status(200).json(post);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


// Feature Post
exports.getFeaturePostController = async (req, res) => {
    try {
        const post = await Post.aggregate([{ $sample: { size: 1 } }]);
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

// Recent Post
exports.getRecentPostController = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).limit(3);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


// Get Trending Posts
exports.getTrendingPosts = async (req,res)=>{
    try {
        const posts = await Post.find().sort( { views: -1 } ).limit(4)
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


// Get Posts by Category

exports.getCategoryPosts = async (req,res) =>{
    const catName = req.params.catName
    try {

        const posts = await Post.find({categories:{ "$in" : [catName]}});

        res.status(200).json(posts);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

