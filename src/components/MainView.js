import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MainView.css'
import { Affix, Select, Icon, Row, Col, List, Button, Layout } from 'antd'
import 'antd/dist/antd.css' 
import { connect } from 'react-redux'
import { fetchCategories, fetchAllPosts } from '../actions'

const { Header, Footer, Content } = Layout;

class MainView extends Component {
  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.getCategories()
    }
    this.props.getAllPosts()
  }

  render() {
    const Option = Select.Option

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    return (
      <div>
        <Layout>
          <Header>Readable Project</Header> 

          <Content>
          <Row>
              <Col span={12}>
                <h3 style={{ margin: '16px 0' }}>Categories</h3>
                <List
                  bordered
                  dataSource={this.props.categories}
                  renderItem= {
                    item => (<List.Item >
                      <Link to={'/category/' + item.path}><div>{item.name}</div></Link>
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
                  dataSource={Object.keys(this.props.posts).map(key => this.props.posts[key])}
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

function mapStateToProps (state) {
  return {
    categories: state.categories.categories,
    posts: state.posts.posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchAllPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView)
