import React, { Component } from  'react'
import { connect } from 'react-redux'
import { fetchPost, fetchAllComentss, createComment, postVoteComment } from '../actions'
import { Card, Icon, List, Button } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import './Post.css'
import CommentForm from './CommentForm'
import uuid from 'uuid/v1'

class Post extends Component {

  state = {
    commentFormVisibility: false,
    commentFormOk: "Save",
    commentFormCancel: "Cancel"
  }
  
  componentDidMount() {
    const postId = this.props.match.params.id
    if (!this.posts) {
      this.props.getPost(postId)
    } else {
      this.props.post = this.posts2[postId]
    }
    this.props.getComments(postId)
  }

  showModal = () => {
    this.setState({
      commentFormVisibility: true
    })
  }

  hideModal = () => {
    this.setState({
      commentFormVisibility: false
    })
  }

  saveComment = (values) => {
    const comment = this.generateDataComment(values)
    this.props.postComment(comment)
      .then(() => {
        this.setState({
          commentFormVisibility: false
        })
      })
  }

  generateDataComment = (values) => {
    const postId = this.props.match.params.id
    const comment = {}
    comment.author = values.author
    comment.body = values.body
    comment.id = uuid()
    comment.timestamp = Date.now()
    comment.parentId = postId
    return comment
  }

  handleVote = (commentId, option = 'upVote') => {
    this.props.sendCommentVote(commentId, option)
      .then(() => {})
      .catch(error => console.log(error))
  }

  editComment = (comment) => {
    console.log(`editComment`, comment)
  }

  deletComment = (commentId) => {
    console.log(`deleteComment`, commentId)
  }

  render() {
    const postData = this.props.post
    const comments = this.props.comments

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
          dataSource={Object.keys(comments).map(key => comments[key])}
          renderItem= {
            comment => (<List.Item >
             <div>
              <p>{comment.body}</p>
              <p>Votes: {comment.voteScore}</p>
              <p>
                <Button shape="circle" icon="like" style={{margin:10}} 
                  onClick={() => this.handleVote(comment.id)}/> 
                <Button shape="circle" icon="dislike" style={{margin:10}}
                  onClick={() => this.handleVote(comment.id, 'downVote')}/>
                <Button shape="circle" icon="edit" style={{margin:10}}
                  onClick={() => this.editComment(comment)}/>
                <Button shape="circle" icon="delete" style={{margin:10}}
                  onClick={() => this.deletComment(comment.id)}/>
              </p>
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
    getComments: (postId) => dispatch(fetchAllComentss(postId)),
    postComment: (comment) => dispatch(createComment(comment)),
    sendCommentVote: (commentId, voteOption) => dispatch(postVoteComment(commentId, voteOption))
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)