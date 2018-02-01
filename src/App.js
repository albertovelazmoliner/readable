import React from 'react'
import { Route } from 'react-router-dom'
import MainView from './components/MainView'
import AddPost from './components/AddPost'
import CategoryPosts from './components/CategoryPosts'
import Post from './components/Post'

class ReadableApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/addPost" component={AddPost} />
        <Route exact path="/" component={MainView} />
        <Route exact path="/category/:id" component={CategoryPosts} />
        <Route exact path="/post/:id" component={Post} />
      </div>
    )
  }
}

export default ReadableApp
