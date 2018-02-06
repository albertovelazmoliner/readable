import React, { Component } from  'react'
import { connect } from 'react-redux'
import { fetchPost, fetchAllComentss } from '../actions'
import { Card, Icon, List, Button } from 'antd'
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
    this.props.getComments(postId)
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
      <div style={{padding:20}}>
        <Card title={postData.title} style={{ width:"50%", margin:"auto"}}
          actions={[
            <Icon type="edit" />, 
            <Icon type="delete"/>, 
            <Icon type="like"/>, 
            <Icon type="dislike"/>,
            <Icon type="plus"/>
          ]}>
          <h2><p>Author: {postData.author}</p></h2>
          <h3><p>{postData.body}</p></h3>
          <p>Votes: {postData.voteScore}</p>
          <p>{moment(postData.timestamp).format('LLL')}</p>
        </Card>
        <br/>
        <h3 style={{ width:"50%", margin:"auto" }}>Comments:
        <Button type="primary" icon="plus" size="large" style={{float:"right"}}>Add new comment</Button> </h3>
        
        <br/>
        <List
          bordered
          dataSource={this.props.comments}
          renderItem= {
            comment => (<List.Item >
             <div>
              <p>{comment.body}</p>
              <p>Votes: {comment.voteScore}</p>
              <p>
                <Button shape="circle" icon="like" style={{margin:10}}/> 
                <Button shape="circle" icon="dislike" style={{margin:10}}/>
                <Button shape="circle" icon="edit" style={{margin:10}}/>
                <Button shape="circle" icon="delete" style={{margin:10}}/></p>
            </div>
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
    post: state.posts.currentPost,
    comments: state.comments.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (postId) => dispatch(fetchPost(postId)),
    getComments: (postId) => dispatch(fetchAllComentss(postId))
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)