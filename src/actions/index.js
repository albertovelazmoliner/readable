import * as api from './../utils/api'

export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_POST = 'UPDATE_POST'
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
export const REQUEST_COMMENT = 'REQUEST_COMMENT'

export const addPost = (post) => ({
  type: ADD_POST,
  post
})

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
})

export const updatePost = (id, post ) => ({
  type: UPDATE_POST,
  id, post
})

export const updateComment = (id, comment) => ({
  type: UPDATE_COMMENT,
  id, comment
})

export const deletePost = (id) => ({
  type: DELETE_POST,
  id
})

export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id
})

export const votePost = (id, option) => ({
  type: VOTE_POST,
  id, option
})

export const voteComment = (id, option) => ({
  type: VOTE_COMMENT,
  id, option
})

export const requestAllPosts = () => ({
  type: REQUEST_ALL_POSTS
})

export const receiveAllPosts = (posts) => ({
  type: RECEIVE_ALL_POSTS,
  posts
})

export const requestPost = () => ({
  type: REQUEST_POST
})

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post
})

export const requestAllComments = () => ({
  type: REQUEST_ALL_COMMENTS
})

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
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