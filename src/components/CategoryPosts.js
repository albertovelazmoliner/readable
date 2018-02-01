import React, { Component } from 'react'

class CategoryPosts extends Component {
  render() {
    const category = this.props.match.params.id
    return (
      <div>Category:{category}</div>
    )
  }
}

export default CategoryPosts