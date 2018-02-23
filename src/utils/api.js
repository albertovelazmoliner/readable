import { message } from 'antd'

const api = 'http://localhost:3001'

// Generate a unique token for storing your data on the backend server.
let token = window.localStorage.token
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

const errorHandler = msg => (error) => {
  message.error(`There was an error: ${msg}`)
  console.error(error)
  throw error
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
    .catch(errorHandler('failed getting categories'))

export const getPostFromCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .catch(errorHandler('failed getting posts'))

export const getAllPosts = () => 
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .catch(errorHandler('failed getting posts'))

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .catch(errorHandler('failed getting post'))

export const getAllComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .catch(errorHandler('failed getting comments'))

export const getComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(errorHandler('failed getting comment'))

export const voteComment = (commentId, option) => 
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
  .catch(errorHandler('failed voting comment'))

export const postPost = (post) => 
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
  .catch(errorHandler('failed saving post'))

export const votePost = (postId, option = "upVote") =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
  .catch(errorHandler('failed voting post'))

export const updatePost = (postId, author, title, body, category) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ author, title, body, category })
  }).then(res => res.json())
  .catch(errorHandler('failed updating post'))
    
export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type' : 'application/json'
    }
  }).then(res => res.json())
  .catch(errorHandler('failed deleting post'))

export const postComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())
  .catch(errorHandler('failed saving comment'))

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type' : 'application/json'
    }
  }).then(res => res.json())
  .catch(errorHandler('failed deleting comment'))

export const updateComment = (commentId, body, timestamp = Date.now()) => 
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ body, timestamp })
  }).then(res => res.json())
  .catch(errorHandler('failed updating comment'))
