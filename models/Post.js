const {Schema , model} = require('mongoose');

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    categories:[String],
    thumbnail:String,
    views:{
        type:Number,
        default:0
    },
    readTime:String
},{timestamps:true});

// postSchema.index(
//     {
//         title: 'text',
//         description:'text'
//     }
// );

const Post = model('Post', postSchema);
module.exports = Post;