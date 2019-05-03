const express = require('express');
const router = express.Router();
const {ListPosts} = require('./model');

router.get('/blog-posts', (req, res, next) => {
  ListPosts.get()
    .then(posts => {
        res.status(200).json({
            message: "Success: sent the list of blog posts",
            status: 200,
            posts: posts
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Internal server error.",
            status: 500
        });
        return next();
    });
});

router.get('/blog-posts/:author', (req, res, next) => {

  if(!(req.params.author)) {
    res.status(406).json({
      message: "No author name received",
      status: 406
    });
    return next();
  }

  let authorName = req.params.author;

  ListPosts.getAuthor(authorName)
    .then(posts => {
      console.log(posts);
      res.status(200).json({
        message : "Success: posts with this author exist",
        status : 200,
        posts : posts
      });
    })
    .catch(err => {
      res.status(404).json({
        message : "Blog posts not found with this author",
        status : 404
      });
      return next();
    });
});

router.post('/blog-posts', (req, res, next) => {
  let requiredFields = ['title', 'content', 'author', 'publishDate'];

  for(let i = 0; i < requiredFields.length; i++) {
    let currentField = requiredFields[i];
    if(!(currentField in req.body)) {
      return res.status(406).json({
        message : `Missing field ${currentField} in body`,
        status : 406
      });
    }
  }

  let objectToAdd = ListPosts.post(req.body.title, req.body.content, req.body.author, req.body.publishDate);

  res.status(201).json({
    message : "Success: Added blog post",
    status : 201,
    objectToAdd
  });
});

router.delete('/blog-posts/:id', (req, res, next) => {
  let postID = req.params.id;

  if(!postID) {
    res.status(406).json({
      message: "No ID received",
      status: 406
    });
  }

  let deleted = ListPosts.delete(postID);

  if(deleted){
    res.status(204).json({
      message : "Post deleted",
      status : 204
    });
  }
  else {
    res.status(404).json({
      message : "ID not found in posts",
      status : 404
    });
    next();
  }
});

router.put('/blog-posts/:id', (req, res, next) => {
  let posts = ListPosts.get();
  let postID = req.params.id;

  if(!postID) {
    res.status(406).json({
      message: "No ID received",
      status: 406
    });
  }

  let postBody = req.body;

  var update = ListPosts.put(postID, postBody.title, postBody.content, postBody.author, postBody.publishDate);

  if(update) {
    res.status(200).json({
      message: "Success: Blog post was updated",
      status: 200,
      post: update
    });
  }
  else {
    res.status(404).json({
      message: "No fields updated",
      status: 404
    });
    next();
  }

});

module.exports = router;
