function getPosts(){
    let url = "posts/api/blog-posts";
    let settings = {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json'
        }
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw Error(response.statusText);
        })
        .then(responseJSON => {
            appendPosts(responseJSON);
        });
}

function appendPosts(item){
    $('.blog-posts').html('<div class="getPosts"><h2>Blog posts</h2><hr><hr></div>');
    for(let i = item.posts.length - 1; i >= 0; i--){
        $('.getPosts').append(`
          <div class="post">
            <p class="id"> ID: ${item.posts[i]._id}</p>
            <p class="title">${item.posts[i].title}</p>
            <p class="content">${item.posts[i].content}</p>
            <p class="author">${item.posts[i].author}</p>
            <p class="publishedDate">${item.posts[i].publishDate}</p>
          </div>
          <hr>
        `)
    }
};

function getAuthorPost() {
  $('.btn-group').append(`
    <div class="get-post-author">
    <hr>
    <p>Search for posts with: </p>
    <form>
      <label for="AuthorPost">Author</label>
      <input type="text" id="authorGet" name="AuthorPost">

      <input type="button" value="Submit" id="submitBtn">
    </form>
  `);

  $("#submitBtn").on("click", function(e) {
    e.preventDefault();

    authorPost = $("#authorGet").val();
    if(authorPost == "") {
      alert("Enter a name");
    }
    else {
      submitAuthor(authorPost);
    }
    $(getPosts);
  });
}

function submitAuthor(authorPost) {
  let url = "posts/api/blog-posts/" + authorPost;
  let settings = {
      method : "GET",
      headers : {
          'Content-Type' : 'application/json'
      }
  };

  fetch(url, settings)
      .then(response => {
          if (response.ok){
              return response.json();
          }
          throw Error(response.statusText);
      })
      .then(responseJSON => {
          appendPosts(responseJSON);
      });

  $(".get-post-author").remove();
}

function addPost() {
  $('.btn-group').append(`
    <div class="add-post">
      <hr>
      <p>Add new post: </p>
      <form>
        <label for="TitlePost">Title</label>
        <input type="text" id="titleUpdate" name="TitlePost">

        <label for="ContentPost">Content</label>
        <input type="text" id="contentUpdate" name="ContentPost">

        <label for="AuthorPost">Author</label>
        <input type="text" id="authorUpdate" name="AuthorPost">

        <label for="DatePost">Published Date</label>
        <input type="text" id="dateUpdate" name="DatePost">

        <input type="button" value="Submit" id="submitBtn">
      </form>
    </div>
  `);

  $("#submitBtn").on("click", function(e) {
    titlePost = $("#titleUpdate").val();
    contentPost = $("#contentUpdate").val();
    authorPost = $("#authorUpdate").val();
    datePost = $("#dateUpdate").val();

    if(titlePost == "" || contentPost == "" || authorPost == "" || datePost == "") {
      alert("Missing post information");
    }
    else {
      submitNewPost(titlePost, contentPost, authorPost, datePost);
    }
    $(getPosts);
  });
}

function submitNewPost(title, content, author, date) {
  let url = "posts/api/blog-posts";
  let item = {
    title : title,
    content : content,
    author : author,
    publishDate : date
  };

  let settings = {
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(item)
  };
  fetch(url, settings)
    .then(response => {
      if (response.ok){
        return response.json();
      }
      else{
        return new Promise(function(resolve, reject){
          resolve(response.json());
        })
        .then(item =>{
          throw new Error(item.message);
        });
      }
    })
    .then(responseJSON => {
      $(getPosts);
    })
    .catch(err => {
            alert(err.message);
    });
}

function updatePosts(){
  $('.btn-group').append(`
    <div class="update-post">
      <hr>
      <p>Update post: </p>
      <form>
        <label for="IdPost">ID</label>
        <input type="text" id="idUpdate" name="IdPost">

        <label for="TitlePost">Title</label>
        <input type="text" id="titleUpdate" name="TitlePost">

        <label for="ContentPost">Content</label>
        <input type="text" id="contentUpdate" name="ContentPost">

        <label for="AuthorPost">Author</label>
        <input type="text" id="authorUpdate" name="AuthorPost">

        <label for="DatePost">Published Date</label>
        <input type="text" id="dateUpdate" name="DatePost">

        <input type="button" value="Submit" id="submitBtn">
      </form>
    </div>
  `);

  $("#submitBtn").on("click", function(e) {
    e.preventDefault();

    idPost = $("#idUpdate").val();
    titlePost = $("#titleUpdate").val();
    contentPost = $("#contentUpdate").val();
    authorPost = $("#authorUpdate").val();
    datePost = $("#dateUpdate").val();


    if(idPost == "" &&  titlePost == "" && contentPost == "" && authorPost == "" && datePost == "") {
      alert("Missing post information");
    }
    else {
      submitUpdate(idPost, titlePost, contentPost, authorPost, datePost);
    }
    $(getPosts);
  });
}

function submitUpdate(id, title, content, author, date) {
  let url = 'posts/api/blog-posts/' + id;
  let item = {
    title : title,
    content : content,
    author : author,
    publishDate : date
  };
  let settings = {
    method : 'PUT',
    headers : {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(item)
  }
  fetch(url, settings)
    .then(response => {
      if (response.ok){
        return response.json();
      }
      else{
        return new Promise(function(resolve, reject){
          resolve(response.json());
        })
        .then(item =>{
          throw new Error(item.message);
        });
      }
    })
    .then(responseJSON => {
      $(getPosts);
    })
    .catch(err => {
            alert(err.message);
    });

    $(".update-post").remove();

}

function deletePosts() {
  $('.btn-group').append(`
    <div class="delete-post">
      <hr>
      <p>Add new post: </p>
      <form>
        <label for="IDPost">ID</label>
        <input type="text" id="IDDelete" name="IDPost">

        <input type="button" value="Submit" id="submitBtn">
      </form>
    </div>
  `);

  $("#submitBtn").on("click", function(e) {
    e.preventDefault();

    idPost = $("#IDDelete").val();

    if(idPost == "") {
      alert("Missing post ID");
    }
    else {
      submitDelete(idPost);
    }
    $(getPosts);
  });
}

function submitDelete(id) {
  let url = `posts/api/blog-posts/` + id;
  let settings = {
      method : 'DELETE',
      headers : {
          'Content-Type' : 'application/json'
      },
  }

  fetch(url, settings)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        return new Promise(function(resolve, reject){
          resolve(response.json());
        })
        .then(data =>{
          throw new Error(data.message);
        });
      }
    })
    .then(responseJSON => {
      $(getPosts);
    })
    .catch(err => {
      alert(err.message);
    });

  $(".delete-post").remove();
}

function watchForm() {
  $("#all").on("click", function(e) {
    e.preventDefault();
    $(".get-post-author").remove();
    $(".update-post").remove();
    $(".add-post").remove();
    $(".delete-post").remove();

    getPosts();
  });

  $("#byAuthor").on("click", function(e) {
    e.preventDefault();
    $(".get-post-author").remove();
    $(".update-post").remove();
    $(".add-post").remove();
    $(".delete-post").remove();

    getAuthorPost();
  });

  $('#new').on("click", function(e) {
    e.preventDefault();
    $(".get-post-author").remove();
    $(".update-post").remove();
    $(".add-post").remove();
    $(".delete-post").remove();

    getPosts();
    addPost();
  });

  $("#update").on("click", function(e) {
    e.preventDefault();
    $(".get-post-author").remove();
    $(".update-post").remove();
    $(".add-post").remove();
    $(".delete-post").remove();

    getPosts();
    updatePosts();
  });

  $('#delete').on("click", function(e) {
    e.preventDefault();
    $(".get-post-author").remove();
    $(".update-post").remove();
    $(".add-post").remove();
    $(".delete-post").remove();

    getPosts();
    deletePosts();
  });
}

$(watchForm);
