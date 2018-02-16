import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Select } from 'antd'

const { TextArea } = Input;
const FormItem = Form.Item
const Option = Select.Option;

class PostForm extends Component {

  state = {
    loading: false,
    category: ""
  }

  componentDidMount() {
    const postId = this.props.match.params.id
    if (!this.posts) {
      //this.props.getPost(postId)
    } else {
      this.props.post = this.posts2[postId]
    }
    if (this.props.categories.length === 0) {
      //this.props.getCategories()
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
    console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    const { update, selectedPost } = this.props
    return (
      <div>
        <Form>
        <FormItem>
        {getFieldDecorator('title', {
            initialValue: (update && selectedPost) ? selectedPost.author : "",
            rules: [{ required: true, message: 'Please input the title!' }]
          }, )(
            <Input placeholder="Title" disabled={update}/>
          )}
          </FormItem>
          <FormItem>
          {getFieldDecorator('author', {
            initialValue: (update && selectedPost) ? selectedPost.author : "",
            rules: [{ required: true, message: 'Please input your name!' }]
          }, )(
            <Input placeholder="Author" disabled={update}/>
          )}
          </FormItem>
          <FormItem>
          {getFieldDecorator('body', {
            initialValue: (update && selectedPost) ? selectedPost.body : "",
            rules: [{ required: true, message: 'Please input your text here!' }]
          })(
            <TextArea placeholder="Text" rows={6}/>
          )}
          </FormItem>
          <FormItem>
          {getFieldDecorator('category', {
            initialValue: (update && selectedPost) ? this.state.category : "",
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
          <Button key="submit" type="primary" 
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

const AddPost = Form.create()(PostForm)


export default connect(mapStateToProps)(AddPost)