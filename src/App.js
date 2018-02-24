import React from 'react'
import { Route } from 'react-router-dom'
import MainView from './components/MainView'
import PostForm from './components/PostForm'
import Post from './components/Post'

class ReadableApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/PostForm/:id" component={PostForm} />
        <Route exact path="/PostForm" component={PostForm} />
        <Route exact path="/" component={MainView} />
        <Route exact path="/:category" component={MainView} />
        <Route exact path="/:category/:post_id" component={Post} />
      </div>
    )
  }
}

export default ReadableApp
