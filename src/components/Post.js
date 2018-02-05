import React, { Component } from  'react'
import { connect } from 'react-redux'
import { fetchPost } from '../actions'
import { Card, Icon, List } from 'antd'
import moment from 'moment'

class Post extends Component {

  componentDidMount() {
    console.log(this.props.match.params.id)
    const postId = this.props.match.params.id
    if (!this.posts) {
      this.props.getPost(postId)
    } else {
      this.props.post = this.posts.filter((post) => postId === post.id)
    }
  }

  render() {
    const postData = this.props.post
    console.log(this)
    if (!this.props.post) {
      return (
        <div> 
          <h1>LOADING</h1>
        </div>)
    }
    return (
      <div>
        <Card title={postData.title} style={{ width:"50%", margin:"auto"}}
          actions={[<Icon type="edit" />, <Icon type="delete"/>, <Icon type="like"/>, <Icon type="dislike"/>]}>
          <h2><p>{postData.author}</p></h2>
          <h3><p>{postData.body}</p></h3>
          <p>Votes: {postData.voteScore}</p>
          <p>{moment(postData.timestamp).format('LLL')}</p>
        </Card>
        <h3 style={{ width:"50%", margin:"auto" }}>Comments:</h3>
        <List
          bordered
          dataSource={{}}
          renderItem= {
            item => (<List.Item >
             <div>{item.name}</div>
              </List.Item>)
          }
          style={{ width:"50%", margin:"auto"}}
        />
      </div>
    )
  }
}


function mapStateToProps (state) {
  console.log(state)
  return {
    posts: state.posts.posts,
    post: state.posts.currentPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (postId) => dispatch(fetchPost(postId))
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)