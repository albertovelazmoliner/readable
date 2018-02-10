import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES,
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS,
  REQUEST_ALL_COMMENTS,
  RECEIVE_ALL_COMMENTS,
  RECEIVE_POST
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
    default:
      return state
  }
}

const posts = (
  state = {
    isLoading: false,
    currentPost:null,
    posts:{}
  },
  action
) => {
  switch (action.type) {
    case REQUEST_ALL_POSTS:
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

    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})


