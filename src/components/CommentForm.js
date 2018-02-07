import React, { Component } from  'react'
import { Modal, Button, Form, Input, Icon } from 'antd'

const { TextArea } = Input;
const FormItem = Form.Item

class BaseForm extends Component {
  state = {
    loading: false
  }



  render() {
    
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
      <div>
        <Form>
        <Modal
          title="Create a new comment"
          visible={this.props.visible}
          footer={[
            <Button key="cancel" onClick={this.props.onCancel}>{this.props.cancelText}</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} 
              // onClick={() => this.props.onOk({})}
              onClick={() => console.log(this)}>
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

/*function confirm() {
  Modal.confirm({
    title: 'Confirm',
    content: 'Bla bla ...',
    okText: '确认',
    cancelText: '取消',
  });
}

ReactDOM.render(
  <div>
    <LocalizedModal />
    <br />
    <Button onClick={confirm}>Confirm</Button>
  </div>,
  mountNode
);*/

