import React, { Component } from  'react'
import { Modal, Button, Form, Input } from 'antd'
import PropTypes from 'prop-types'

const { TextArea } = Input;
const FormItem = Form.Item

class BaseForm extends Component {
  state = {
    loading: false
  }

  static propTypes = {
    selectedComment: PropTypes.object,
    update: PropTypes.bool
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        if (this.props.update) {
          const comment = this.props.selectedComment
          comment.body = values.body
          this.props.onOk(comment)
        } else {
          this.props.onOk(values)
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { update, selectedComment } = this.props
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
        <Modal
          closable={false}
          destroyOnClose={true}
          title={update ? "Update this comment" : "Create a new comment" } 
          visible={this.props.visible}
          afterClose={() => this.setState({ loading: false })}
          footer={[
            <Button key="cancel" onClick={this.props.onCancel}>{this.props.cancelText}</Button>,
            <Button key="submit" type="primary" 
              loading={this.state.loading}
              onClick={this.handleSubmit}>
                {this.props.okText}
            </Button>,
          ]}
        >
          <FormItem>
          {getFieldDecorator('author', {
            initialValue: (update && selectedComment) ? selectedComment.author : "",
            rules: [{ required: true, message: 'Please input your name!' }]
          }, )(
            <Input placeholder="Author" disabled={update}/>
          )}
          </FormItem>
          <FormItem>
          {getFieldDecorator('body', {
            initialValue: (update && selectedComment) ? selectedComment.body : "",
            rules: [{ required: true, message: 'Please input your text here!' }]
          })(
            <TextArea placeholder="Text" rows={6}/>
          )}
          </FormItem>
        </Modal>
        </Form>
      </div>
    );
  }
}

const CommentForm = Form.create()(BaseForm)

export default CommentForm


