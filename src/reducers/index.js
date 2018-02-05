import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES,
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS
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

const posts = (
  state = {
    posts:[],
    isLoading: false
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
      console.log(`RECEIVE_ALL_POSTS`, RECEIVE_ALL_POSTS)
      return {
        ...state,
        isLoading: false,
        posts: action.posts
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})
  
