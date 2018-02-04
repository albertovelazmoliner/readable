import { combineReducers } from 'redux'
import {
  RECEIVE_CATEGORIES
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

export default categories
