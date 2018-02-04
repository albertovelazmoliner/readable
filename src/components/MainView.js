import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MainView.css'
import * as api from './../utils/api'
import { Affix, Select, Icon, Row, Col, List, Button, Layout } from 'antd'
import 'antd/dist/antd.css'
import 'antd/dist/antd.css' 
import { connect } from 'react-redux'
import { fetchCategories  } from '../actions'

const { Header, Footer, Content } = Layout;

class MainView extends Component {
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
                    item => (<List.Item >
                      <Link to={'/category/' + item}><div>{item}</div></Link>
                      </List.Item>)
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
                  className="categories-list"
                  bordered
                  dataSource={postData}
                  renderItem= {
                    post => (<List.Item key={post.id}>
                      <Link to={'/post/' + post.id}><strong>{post.title}</strong></Link> <br/> {post.author} <br/>
                      {post.body}
                      </List.Item>)
                  }
                />
              </Col>
            </Row>
          </Content>
          <Footer>
            {/* <Button type="primary" icon="plus" size="large"> */}
            <Link to="/addPost">Create a new Post</Link>
            {/* </Button> */}
          </Footer>
        </Layout>
        <div>
        
        </div>
      </div>
    );
  }
}

export default MainView;
function mapStateToProps (state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories())
  }
}

