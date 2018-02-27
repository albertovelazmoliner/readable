import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Select, Layout } from 'antd'
import './PostForm.css'
import uuid from 'uuid/v1'
import { fetchCategories, fetchPost, putUpdatePost, removeSelectedPost, createPost } from '../actions'
import PropTypes from 'prop-types'
import NotFound from './NotFound';

const { TextArea } = Input;
const FormItem = Form.Item
const Option = Select.Option;
const { Header, Content } = Layout

class PostFormBase extends Component {

  static propTypes = {
    posts: PropTypes.object.isRequired,
    post: PropTypes.object,
    categories: PropTypes.array.isRequired,
    getCategories: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    cleanPost: PropTypes.func.isRequired,
    postPost: PropTypes.func.isRequired
  }

  state = {
    loading: false,
    category: ""
  }

  componentDidMount() {
    const postId = this.props.match.params.post_id
    if (postId) {
      if (!this.posts) {
        this.props.getPost(postId)
      } else {
        this.props.post = this.posts2[postId]
      }
    }
    if (this.props.categories.length === 0) {
      this.props.getCategories()  
    }
  }

  componentWillUnmount() {
    this.props.cleanPost()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { post } = this.props
      if (!err) {
        this.setState({ loading: true })
        if (this.props.post == null ) {
          const newPost = this.generateDataPost(values)
          this.props.postPost(newPost)
          .then(() => {
            this.setState({ loading: false })
            this.props.history.goBack()
          })
        } else {
          this.props.updatePost(post.id, 
            values.author, 
            values.title, 
            values.body,
            values.category)
          .then(() => {
            this.setState({ loading: false })
            this.props.history.goBack()
          })
        }
      }
    });
  }

  generateDataPost = (values) => {
    const newPost = {}
    newPost.title = values.title
    newPost.author = values.author
    newPost.body = values.body
    newPost.category = values.category
    newPost.id = uuid()
    newPost.timestamp = Date.now()
    return newPost
  }

  handleCategoryChange = (category) => (
    this.setState({ category })
  )

  handleBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { post } = this.props
    const title = post ? "EDIT THIS POST" : "CREATE A NEW POST"

    if (post && post.title === undefined) {
      return <NotFound/>
    }
    return (
      <div >
        <Layout style={{backgroundColor:"#ffffff"}}>
          <Header >
            <div>
              <Button type="primary" icon="left"
                onClick={() => this.handleBack()}
              >
                Back
              </Button >
              <span style={{color:"#ffffff", marginLeft:"20px"}}>
              {title}
              </span>
            </div>
          </Header>
          <Content style={{padding:"20px"}}>
            <Form className="post-form">
            <FormItem>
            {getFieldDecorator('title', {
                initialValue: (post) ? post.title : "",
                rules: [{ required: true, message: 'Please input the title!' }]
              }, )(
                <Input placeholder="Title"/>
              )}
              </FormItem>
              <FormItem>
              {getFieldDecorator('author', {
                initialValue: (post) ? post.author : "",
                rules: [{ required: true, message: 'Please input your name!' }]
              }, )(
                <Input placeholder="Author" />
              )}
              </FormItem>
              <FormItem>
              {getFieldDecorator('body', {
                initialValue: (post) ? post.body : "",
                rules: [{ required: true, message: 'Please input your text here!' }]
              })(
                <TextArea placeholder="Text" rows={6}/>
              )}
              </FormItem>
              <h4 className="form-title-category">
                Category
              </h4>
              <FormItem>
              {getFieldDecorator('category', {
                initialValue: (post) ? post.category : this.state.category,
                rules: [{ required: true, message: 'Select the category!' }]
              })(
                <Select
                  size='large'
                  onChange={this.handleCategoryChange}>
                  {this.props.categories.map(category => (
                    <Option value={category.name} key={category.path}>{category.name}</Option>
                  ))}
                </Select>
              )}
              </FormItem>
              <Button key="submit" type="primary" className="save-post"
                  loading={this.state.loading}
                  onClick={this.handleSubmit}>
                    Save Post
                </Button>
            </Form>
          </Content>
        </Layout>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    posts: state.posts.posts,
    post: state.posts.currentPost,
    categories: state.categories.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getPost: (postId) => dispatch(fetchPost(postId)),
    updatePost: (postId, author, title, body, category) =>
     dispatch(putUpdatePost(postId, author, title, body, category)),
    cleanPost: () => dispatch(removeSelectedPost()),
    postPost: (post) => dispatch(createPost(post))
  }
}

const PostForm = Form.create()(PostFormBase)


export default connect(mapStateToProps, mapDispatchToProps)(PostForm)