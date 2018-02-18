import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES,
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS,
  REQUEST_ALL_COMMENTS,
  RECEIVE_ALL_COMMENTS,
  RECEIVE_POST,
  ADD_COMMENT,
  UPDATE_COMMENT,
  REQUEST_UPDATE_COMMENT,
  REQUEST_DELETE_COMMENT,
  REQUEST_UPDATE_POST,
  UPDATE_POST,
  VOTE_POST,
  REMOVE_SELECTED_POST,
  ADD_POST,
  REQUEST_DELETE_POST,
  DELETE_POST
} from './../actions'
 
const categories = (
  state = {
    categories: []
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    default: 
      return state
  }
}

const comments = (
  state = {
    comments: {},
    isLoading: false,
    currentComment: null
  },
  action
) => {
  switch(action.type) {
    case REQUEST_ALL_COMMENTS:
    case REQUEST_UPDATE_COMMENT:
    case REQUEST_DELETE_COMMENT:
      return {
        ...state,
        isLoading: true
      }
    case RECEIVE_ALL_COMMENTS:
      return {
        ...state,
        isLoading: false,
        comments: action.comments.reduce((accumulator, comment) => {
          accumulator[comment.id] = comment
          return accumulator
        }, {})
      }
    case ADD_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: {
          ...state.comments,
          [action.comment.id] : action.comment
        }
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: {
          ...state.comments,
          [action.comment.id] : action.comment
        }
      }
    default:
      return state
  }
}

const posts = (
  state = {
    isLoading: false,
    currentPost: null,
    posts:{}
  },
  action
) => {
  switch (action.type) {
    case REQUEST_ALL_POSTS:
    case REQUEST_UPDATE_POST:
    case REQUEST_DELETE_POST:
      return {
        ...state,
        isLoading: true
      }
    case RECEIVE_ALL_POSTS:
      return {
        ...state,
        isLoading: false,
        posts: action.posts.reduce((accumulator, post) => {
          accumulator[post.id] = post
          return accumulator
        }, {})
      }
    case RECEIVE_POST:
      return {
        ...state,
        isLoading: false,
        currentPost: action.post
      }
    case UPDATE_POST:
      return {
        ...state,
        isLoading: false,
        posts: {
          ...state.posts,
          [action.post.id]: action.post
        }
      }
    case DELETE_POST:
      return {
        ...state,
        isLoading: false,
        posts: {
          ...state.posts,
          [action.post.id]: action.post
        },
        currentPost: null
      }
    case VOTE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.post.id]: action.post
        },
        currentPost: action.post
      }
    case ADD_POST:
     return {
       ...state,
       posts: {
         ...state.posts,
         [action.post.id]: action.post
       },
      isLoading: false
     }
    case REMOVE_SELECTED_POST:
      return {
        ...state,
        currentPost: null
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})


