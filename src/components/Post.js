import React, { Component } from  'react'
import { connect } from 'react-redux'
import { fetchPost, 
         fetchAllComentss,
         createComment,
         postVoteComment,
         putUpdateComment,
         deleteDeleteComment } from '../actions'
import { Card, Icon, Button } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import './Post.css'
import CommentForm from './CommentForm'
import uuid from 'uuid/v1'
import CommentsList from './CommentsList'

class Post extends Component {

  state = {
    commentAddFormVisibility: false,
    commentUpdateFormVisibility: false,
    selectedComment: null,
    loadingForm: false
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

  showAddModal = () => {
    this.setState({
      commentAddFormVisibility: true
    })
  }

  hideAddModal = () => {
    this.setState({
      commentAddFormVisibility: false
    })
  }

  hideUpdateModal = () => {
    this.setState({
      commentUpdateFormVisibility: false,
      selectedComment: null
    })
  }

  saveComment = (values) => {
    this.setState({ loadingForm: true })
    const comment = this.generateDataComment(values)
    this.props.postComment(comment)
      .then(() => {
        this.setState({
          commentAddFormVisibility: false,
          loadingForm: false
        })
      })
  }

  updateComment = (comment) => {
    this.setState({ loadingForm: true })
    const { id, body } = comment
    this.props.sendCommentUpdate(id, body)
      .then(()=> {
        this.setState({
          commentUpdateFormVisibility: false,
          selectedComment: null,
          loadingForm: false
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
    this.setState({
      commentUpdateFormVisibility: true,
      selectedComment: comment
    })
  }

  deletComment = (commentId) => {
    this.props.sendDeleteComment(commentId)
      .then(then => {})
      .catch(error => console.log(error))
  }

  render() {
    const postData = this.props.post
    const comments = this.props.comments

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
        <CommentsList
          comments={Object.keys(comments).map(key => comments[key]).filter(comment => comment.deleted === false)}
          voteHandlerUp={comment => this.handleVote(comment.id)}
          voteHandlerDown={comment => this.handleVote(comment.id, "downVote")}
          editHandler={comment => this.editComment(comment)}
          deleteHandler={comment => this.deletComment(comment.id)}
        />
        <Link to="/addPost">
          <Button className="new-post" type="primary" icon="plus" size="large">
            Add a new post
          </Button>
        </Link>
        <Button className="new-comment" type="primary" icon="plus" size="large"
          onClick={this.showAddModal}>
          Add a new comment
        </Button>

        <CommentForm 
          visible={this.state.commentAddFormVisibility}  
          okText="Save"
          cancelText="Cancel"
          onCancel = {() => this.hideAddModal()}
          onOk = {(comment) =>  this.saveComment(comment)} />

        <CommentForm 
          visible={this.state.commentUpdateFormVisibility}  
          okText="Save"
          cancelText="Cancel"
          update={true}
          loadingForm={this.state.loadingForm}
          selectedComment={this.state.selectedComment}
          onCancel = {() => this.hideUpdateModal()}
          onOk = {(comment) =>  this.updateComment(comment)} />
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
    sendCommentVote: (commentId, voteOption) => dispatch(postVoteComment(commentId, voteOption)),
    sendCommentUpdate: (commentId, body) => dispatch(putUpdateComment(commentId, body)),
    sendDeleteComment: (commentId) => dispatch(deleteDeleteComment(commentId))
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)