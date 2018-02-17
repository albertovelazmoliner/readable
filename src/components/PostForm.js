import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Select } from 'antd'
import './PostForm.css'
import { fetchCategories, fetchPost } from '../actions'

const { TextArea } = Input;
const FormItem = Form.Item
const Option = Select.Option;

class PostFormBase extends Component {

  state = {
    loading: false,
    category: ""
  }

  componentDidMount() {
    const postId = this.props.match.params.id
    if (!this.posts) {
      this.props.getPost(postId)
    } else {
      this.props.post = this.posts2[postId]
    }
    if (this.props.categories.length === 0) {
      this.props.getCategories()  
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
      // if (!err) {
      //   this.setState({ loading: true })
      //   if (this.props.update) {
          
      //   } else {
          
      //   }
      // }
    });
  }

  handleCategoryChange = (category) => (
    this.setState({ category })
  )

  render() {
    const { getFieldDecorator } = this.props.form;
    const { post } = this.props
    const title = post ? "Edit this post" : "Create a new post"
    return (
      <div >
        <h3 className="post-form title-form">
          {title}
        </h3>
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
            <Input placeholder="Author" disabled={post != null}/>
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
              
              disabled={post != null}
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
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log(state)
  return {
    posts: state.posts.posts,
    post: state.posts.currentPost,
    categories: state.categories.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getPost: (postId) => dispatch(fetchPost(postId))
  }
}

const PostForm = Form.create()(PostFormBase)


export default connect(mapStateToProps, mapDispatchToProps)(PostForm)