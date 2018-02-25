import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import MainView from './components/MainView'
import PostForm from './components/PostForm'
import Post from './components/Post'
import NotFound from './components/NotFound'

class ReadableApp extends React.Component {
  render() {
    return (
        <div className="app">
          <Switch>
            <Route exact path="/posts/edit/:post_id" component={PostForm} />
            <Route exact path="/posts/post/new" component={PostForm} />
            <Route exact path="/" component={MainView} />
            <Route exact path="/:category" component={MainView} />
            <Route exact path="/:category/:post_id" component={Post} />
            <Route component={NotFound} />
          </Switch>
        </div>
    )
  }
}

export default ReadableApp
