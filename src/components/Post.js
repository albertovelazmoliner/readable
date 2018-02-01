import React, { Component } from  'react'

class Post extends Component {
  render() {
    const postId = this.props.match.params.id
    return (
      <div>Post detail of post with id: {postId}</div>
    )
  }
}

export default Post