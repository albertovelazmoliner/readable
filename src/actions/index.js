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
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_ALL_COMMENTS = 'REQUEST_ALL_COMMENTS'
export const REQUEST_POST = 'REQUEST_POST'
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
  )
)