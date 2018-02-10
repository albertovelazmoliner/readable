import React, { Component } from  'react'
import { Modal, Button, Form, Input, Icon } from 'antd'

const { TextArea } = Input;
const FormItem = Form.Item

class BaseForm extends Component {
  state = {
    loading: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        this.props.onOk(values)
      }
    });
  }

  render() {
    
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
        <Modal
          title="Create a new comment"
          visible={this.props.visible}
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
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input placeholder="Author" />
          )}
          </FormItem>
          <FormItem>
          {getFieldDecorator('body', {
            rules: [{ required: true, message: 'Please input your text here!' }],
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


