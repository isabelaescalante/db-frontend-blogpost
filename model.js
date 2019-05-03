const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

let postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    publishDate: {type: String, required: true}
});

let Posts = mongoose.model('Posts', postSchema);

const ListPosts = {
    get : function(){
        return Posts.find()
            .then(posts => {
                return posts;
            })
            .catch(err => {
                throw new Error(err);
            });
    },

    getAuthor : function(authorPost){
        return Posts.find({author: authorPost})
            .then(post => {
                return post;
            })
            .catch(err => {
                throw new Error(err);
            });
    },

    post : function(newTitle, newContent, newAuthor, newPublishDate){
      let newPost = {
        title: newTitle,
        content: newContent,
        author: newAuthor,
        publishDate: newPublishDate
      };
      return Posts.create(newPost)
          .then(post => {
              return post;
          })
          .catch(err => {
              throw new Error(err);
          });
    },

    delete : function(blogPostId){
        return Posts.deleteOne({_id: blogPostId})
            .then(post => {
                return post;
            })
            .catch(err => {
                throw new Error(err);
            });
    },

    put : function(blogPostId, blogPostTitle, blogPostContent, blogPostAuthor, blogPostDate){
        return Posts.findByIdAndUpdate({_id: blogPostId}, {$set:{title: blogPostTitle, content: blogPostContent, author: blogPostAuthor, publishDate: blogPostDate}})
            .then(post => {
                return post;
            })
            .catch(err => {
                throw new Error(err);
            });
    }
};

module.exports = {ListPosts}
