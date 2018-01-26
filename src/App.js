import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import * as api from './utils/api'
import { Affix, Select, Icon, Row, Col, List, Button, Layout } from 'antd'
import 'antd/dist/antd.css'

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    const Option = Select.Option

    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    
    const postData = [
      {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        commentCount: 2
      },
      {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false,
        commentCount: 0
      }
    ]
    const dataCategories = [
      'React',
      'Redux',
      'Javascript'
    ];
    return (
      <div>
        <Layout>
          <Header>
            Readable Project
          </Header>

          <Content>
          <Row>
              <Col span={12}>
                <h3 style={{ margin: '16px 0' }}>Categories</h3>
                <List
                  bordered
                  dataSource={dataCategories}
                  renderItem= {
                    item => (<List.Item>{item}</List.Item>)
                  }
                />
              </Col>
              <Col span={12}>
              <Select defaultValue="timestamp" style={{ width: 120 }} onChange={handleChange}>
                <Option value="vote">By vote score</Option>
                <Option value="timestamp">By date</Option>
                <Option value="title">By title</Option>
              </Select>
                <h3 style={{ margin: '16px 0' }}>Posts</h3>
                <List
                  bordered
                  dataSource={postData}
                  renderItem= {
                    post => (<List.Item key={post.id}>
                      <strong>{post.title}</strong> &nbsp; {post.author} <br/>
                      {post.body}
                      </List.Item>)
                  }
                />
              </Col>
            </Row>
          </Content>
          <Footer>
            <Button type="primary" icon="plus" size="large">
              Create a new Post
            </Button>
          </Footer>
        </Layout>
        <div>
        
        </div>
      </div>
    );
  }
}

export default App;
