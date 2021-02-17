const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    slug: {
       type: String,
       required: true,
       unique: true,
       trim: true
    }
});

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
     },
     description: {
         type: String,
         required: true,
         trim: true
      },
    slug: {
       type: String,
       required: true,
       unique: true,
       trim: true
    },
    category: [{
        type: Schema.ObjectId,
        ref: 'categoryBlog',
    }],
    image: {
       type: String,
       trim: true
    },
    author: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    public: {
      type: Boolean,
      default: true
    },
    date: {
      type: Date,
      default: Date.now
    }
 });

 const Blog = mongoose.model('Blog', blogSchema);
 const CategoryBlog = mongoose.model('categoryBlog', categorySchema);
 module.exports = {
    Blog,
    CategoryBlog
};