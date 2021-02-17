const {Blog, CategoryBlog} = require('./model');

async function getArticle(slug) {
    try {
      let query = { slug : slug};
  
      const result = await Blog.find(query)
        .populate("author")
        .populate("category");
      return { status: 200, message: result }
    } catch (e) {
      console.log(e);
      return {
        status: 500,
        message: 'Unexpected store error',
        detail: e
      };
    } 
}

async function getCategory(slug) {
    try {
      let query = { slug : slug};
      const category = await CategoryBlog.findOne(query);
      if(!category){
          return {
            status: 404,
            message: 'No category found'
          }
      }

      const result = await Blog.find({category: category._id})
        .populate("author")
        .populate("category");
      return { status: 200, message: result }
    } catch (e) {
      console.log(e);
      return {
        status: 500,
        message: 'Unexpected store error',
        detail: e
      };
    } 
}

async function setArticle(article, user) {

    try {
      if (!article) {
        return {
          status: 400,
          message: 'No article recived'
        };
      }
      if (!company) {
        return {
          status: 400,
          message: 'No company recived'
        };
      }
      article.author = user._id;
      const blogModel = new Blog(article)
      const blogResult = await blogModel.save();
  
      return { status: 201, message: blogResult };
    } catch (e) {
      return {
        status: 500,
        message: 'Unexpected store error',
        detail: e
      };
    }
}async function updateArticle(article){
    try{
        const foundArticle = await Blog.findOne({
            _id: article.id
        });

        if(article.title){
            foundArticle.title = article.title;
        }
        if(article.description){
            foundArticle.description = article.description;
        }
        if(article.slug){
            foundArticle.slug = article.slug;
        }
        if(article.category){
            foundArticle.category = article.category;
        }
        if(article.image){
            foundArticle.image = article.image;
        }
        foundArticle.public = article.public;

        const articleResult = await foundArticle.save();
        return { status: 200, message: articleResult };

    }catch(e){
        return {
            status: 500,
            message: 'Unexpected store error',
            detail: e
        };
    }
}

async function deleteArticle(id) {
    if(!id){
      return {
        status: 400,
        message: 'No article id recived'
      };
    }
  
    try{
      await Blog.findOneAndDelete({_id: id});
      return { status: 200, message: 'The article has been deleted correctly' }
    }catch(e){
      return {
        status: 500,
        message: 'Unexpected error',
        detail: e
      };
    }
  }

module.exports = {
    getArticle,
    getCategory,
    setArticle,
    updateArticle,
    deleteArticle
}