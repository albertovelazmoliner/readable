import * as api from './../utils/api'

export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REQUEST_UPDATE_POST = 'REQUEST_UPDATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const REMOVE_SELECTED_POST = 'REMOVE_SELECTED_POST'
export const REQUEST_UPDATE_COMMENT = 'REQUEST_UPDATE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const REQUEST_ALL_POSTS = 'REQUEST_ALL_POSTS'
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'
export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_ALL_COMMENTS = 'REQUEST_ALL_COMMENTS'
export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS'
export const REQUEST_COMMENT = 'REQUEST_COMMENT'
export const REQUEST_DELETE_COMMENT = 'REQUEST_DELETE_COMMENT'
export const REQUEST_DELETE_POST = 'REQUEST_DELETE_POST'
export const REQUEST_CHANGE_POST_ORDER = 'REQUEST_CHANGE_POST_ORDER'

export const addPost = (post) => ({
  type: ADD_POST,
  post
})

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
})

export const requestUpdatePost = () => ({
  type: REQUEST_UPDATE_POST,
})

export const updatePost = (post) => ({
  type: UPDATE_POST,
  post
})

export const requestUpdateComment = () => ({
  type: REQUEST_UPDATE_COMMENT
})

export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment
})

export const requestDeletePost = () => ({
  type: REQUEST_DELETE_POST
})

export const deletePost = (post) => ({
  type: DELETE_POST,
  post
})

export const requestDeleteComment = () => ({
  type: REQUEST_DELETE_COMMENT
})

export const deleteComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment
})

export const votePost = (post) => ({
  type: VOTE_POST,
  post
})

export const voteComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment
})

export const requestAllPosts = () => ({
  type: REQUEST_ALL_POSTS
})

export const receiveAllPosts = (posts) => ({
  type: RECEIVE_ALL_POSTS,
  posts
})

export const requestAllComments = () => ({
  type: REQUEST_ALL_COMMENTS
})

export const receiveAllComments = (comments) => ({
  type: RECEIVE_ALL_COMMENTS,
  comments
})

export const requestPost = () => ({
  type: REQUEST_POST
})

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post
})

export const removeSelectedPost = () => ({
  type: REMOVE_SELECTED_POST
})

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const requestChangePostOrder = order => ({
  type: REQUEST_CHANGE_POST_ORDER,
  order
})

export const fetchCategories = () => dispatch => (
  api.getCategories()
    .then(categories => dispatch(
      receiveCategories(categories)
    )
  ).catch(error => console.log(`Error`, error))
)

export const fetchAllPosts = () => dispatch => {
  dispatch(requestAllPosts())
  return api.getAllPosts()
    .then(posts => dispatch(receiveAllPosts(posts)))
    .catch(error => console.log(`Error`, error))
}

export const fetchPost = (postId) => dispatch => {
  dispatch(requestPost())
  return api.getPost(postId)
    .then(post => dispatch(receivePost(post)))
    .catch(error => console.log(`Error`, error))
}

export const fetchAllComments = (postId) => dispatch => {
  dispatch(requestAllComments())
  return api.getAllComments(postId)
    .then(comments => dispatch(receiveAllComments(comments)))
    .catch(error => console.log(`Error`, error))
}

export const createComment = (comment) => dispatch => {
  return api.postComment(comment)
    .then(comment => dispatch(addComment(comment)))
    .catch(error => console.log(`Error`, error))
}

export const postVoteComment = (commentId, voteOption) => dispatch => {
  return api.voteComment(commentId, voteOption)
    .then(comment => dispatch(voteComment(comment)))
    .catch(error => console.log(error))
}

export const putUpdateComment = (commentId, body) => dispatch => {
  dispatch(requestUpdateComment())
  return api.updateComment(commentId, body)
    .then(comment => dispatch(updateComment(comment)))
    .catch(error => console.log(error))
}

export const deleteDeleteComment = (commentId) => dispatch => {
  dispatch(requestDeleteComment())
  return api.deleteComment(commentId)
    .then(comment => dispatch(deleteComment(comment)))
    .catch(error => console.log(error))
}

export const putUpdatePost = (postId, title, body) => dispatch => {
  dispatch(requestUpdatePost())
  return api.updatePost(postId, title, body)
    .then(post => dispatch(updatePost(post)))
    .catch(error => console.log(error))
}

export const createPost = (post) => dispatch => {
  return api.postPost(post)
    .then(post => dispatch(addPost(post)))
    .catch(error => console.log(error))
}

export const postVotePost = (postId, voteOption) => dispatch => {
  return api.votePost(postId, voteOption)
    .then(post => dispatch(votePost(post)))
    .catch(error => console.log(error))
}

export const deleteDeletePost = (postId) => dispatch => {
  dispatch(requestDeletePost())
  return api.deletePost(postId)
    .then(post => dispatch(deletePost(post)))
    .catch(error => console.log(error))
}