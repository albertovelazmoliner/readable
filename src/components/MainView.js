import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MainView.css'
import { Affix, Select, Icon, Row, Col, List, Button, Layout, Card } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css' 
import { connect } from 'react-redux'
import { fetchCategories, fetchAllPosts, postVotePost } from '../actions'

const { Header, Footer, Content } = Layout;

class MainView extends Component {
  
  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.getCategories()
    }
    this.props.getAllPosts()
  }

  handlePostVote = (postId, option = 'upVote') => {
    this.props.sendPostVote(postId, option)
      .then(() => {})
      .catch(error => console.log(error))
  }



  render() {
    const Option = Select.Option

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    return (
      <div>
        <Layout>
          <Content>
          <Row>
              <Col span={1}/>
              <Col span={10}>
                <h3 style={{ margin: '16px 0' }}>Categories</h3>
                <List
                  className="list-item"
                  bordered
                  dataSource={this.props.categories}
                  renderItem= {
                    item => (<List.Item >
                      <Link to={'/category/' + item.path}><div>{item.name}</div></Link>
                      </List.Item>)
                  }
                />
              </Col>
              <Col span={1}/>
              <Col span={1}/>
              <Col span={10}>
              <Select defaultValue="timestamp" style={{ width: 120 }} onChange={handleChange}>
                <Option value="vote">By vote score</Option>
                <Option value="timestamp">By date</Option>
                <Option value="title">By title</Option>
              </Select>
                <h3 style={{ margin: '16px 0' }}>Posts</h3>
                <List
                  className="categories-list"
                  bordered
                  itemLayout="vertical"
                  dataSource={Object.keys(this.props.posts).map(key => this.props.posts[key])}
                  renderItem= {
                    post => (
                      <List.Item key={post.id}
                        className="list-item"
                        actions={[
                          <Icon type="like" onClick={() => this.handlePostVote(post.id)}/>, 
                          <Icon type="dislike" onClick={() => this.handlePostVote(post.id, "downVote")}/>
                        ]}>
                      
                        <List.Item.Meta
                          title={
                            <Link to={'/post/' + post.id}>
                              {post.title}
                            </Link>
                          }
                        />      
                        <h4><p>Author: {post.author}</p></h4>
                        <h3><p>{post.body}</p></h3>
                        <p>Votes: {post.voteScore}</p>
                        <p>{moment(post.timestamp).format('LLL')}</p>  
                      </List.Item>
                    )
                  }
                />
              </Col>
              <Col span={1}/>
            </Row>
          </Content>
          <Footer>
            <Link to="/PostForm">
              <Button type="primary" icon="plus" size="large">
                Create a new Post
              </Button>
            </Link>
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
    getAllPosts: () => dispatch(fetchAllPosts()),
    sendPostVote: (postId, voteOption) => dispatch(postVotePost(postId, voteOption)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView)
