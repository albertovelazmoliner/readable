import React, { Component } from  'react'
import { connect } from 'react-redux'
import { fetchPost, fetchAllComentss } from '../actions'
import { Card, Icon, List, Button } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import './Post.css'
import CommentForm from './CommentForm'

class Post extends Component {

  state = {
    commentFormVisibility: false,
    commentFormOk: "Save",
    commentFormCancel: "Cancel"
  }
  

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


  showModal = () => {
    this.setState({
      commentFormVisibility: true
    });
  }
  hideModal = () => {
    this.setState({
      commentFormVisibility: false
    });
  }
  saveComment = (comment) => {
    console.log(comment)
    this.setState({
      commentFormVisibility: false
    });
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
            <Icon type="dislike"/>
          ]}>
          <h2><p>Author: {postData.author}</p></h2>
          <h3><p>{postData.body}</p></h3>
          <p>Votes: {postData.voteScore}</p>
          <p>{moment(postData.timestamp).format('LLL')}</p>
        </Card>
        <br/>
        <div className="flex-container">
        <h3>Comments:</h3>
        </div>
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
        <Link to="/addPost">
          <Button className="new-post" type="primary" icon="plus" size="large">
            Add a new post
          </Button>
        </Link>
        <Button className="new-comment" type="primary" icon="plus" size="large"
          onClick={this.showModal}>
          Add a new comment
        </Button>

        <CommentForm 
          visible={this.state.commentFormVisibility}  
          okText={this.state.commentFormOk}
          cancelText={this.state.commentFormCancel}
          onCancel = {() => this.hideModal()}
          onOk = {(comment) =>  this.saveComment(comment)} />
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