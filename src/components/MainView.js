import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MainView.css'
import { Select, Icon, Row, Col, List, Button, Layout, Popconfirm } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css' 
import { connect } from 'react-redux'
import { fetchCategories, 
         fetchAllPosts, 
         postVotePost, 
         requestChangePostOrder, 
         deleteDeletePost } from '../actions'
import PropTypes from 'prop-types'
import NotFound from './NotFound';

const {Content } = Layout;

export const ORDER_BY_DATE = 'date'
export const ORDER_BY_VOTE = 'vote'
export const ORDER_BY_TITLE = 'title'

class MainView extends Component {

  static propTypes = {
    order: PropTypes.string.isRequired,
    posts: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    getCategories: PropTypes.func.isRequired,
    getAllPosts: PropTypes.func.isRequired,
    sendPostVote: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    changePostOrder: PropTypes.func.isRequired
  }
  
  componentDidMount() {
    const category = this.props.match.params.category
    console.log(`Category`, category)    
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

  orderBy = (a, b) => {
    switch(this.props.order) {
      case ORDER_BY_DATE:
        var dateA = new Date(a.timestamp), dateB = new Date(b.timestamp);
        return dateB - dateA;
      case ORDER_BY_VOTE:
        return b.voteScore - a.voteScore;
      case ORDER_BY_TITLE:
        var titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0; 
      default:
        return true
    }
  }

  handleChange = (value) => {
    console.log(value)
    this.props.changePostOrder(value)
  }

  handleDeletePost = (postId) => {
    this.props.deletePost(postId)
  }

  render() {
    const Option = Select.Option
    const category = this.props.match.params.category
    if (category !== undefined && 
    this.props.categories.filter(cat => cat.name === category).length === 0) {
      return <NotFound/>
    }
    return (
      <div className="container-mainview">
        <Layout>
          <Content style={{ marginTop:"20px", marginBottom:"100px"}}>
          <Row>
            <Col span={1}/>
            <Col span={2}>
            <Link to="/posts/post/new">
              <Button type="primary" icon="plus" size="large">
                Create a new Post
              </Button>
            </Link>
            </Col>
            <Col span={20}>
              <Select defaultValue={this.props.order}
                style={{ width: 220, margin:"16px 0px 16px 0px", float:"right" }} 
                onChange={this.handleChange}>
                <Option value={ORDER_BY_VOTE}>Posts order by vote score</Option>
                <Option value={ORDER_BY_DATE}>Posts order by date</Option>
                <Option value={ORDER_BY_TITLE}>Posts order by title</Option>
              </Select>
            </Col>
            <Col span={1}/>
          </Row>
          <Row>
              <Col span={1}/>
              <Col span={10}>
                {(category === undefined) &&
                <List
                  header={<h3 >Categories</h3>}
                  className="list-item"
                  bordered
                  dataSource={this.props.categories}
                  renderItem= {
                    category => (<List.Item >
                        <Link to={'/' + category.path}>
                        <div>{category.name}</div>
                        </Link>
                      </List.Item>)
                  }
                />}
                {(category !== undefined) &&
                <div>
                  <Link to="/">
                    <Button type="primary" icon="close" size="large">
                      {category}
                    </Button>
                  </Link>
                </div>} 
              </Col>
              <Col span={1}/>
              <Col span={1}/>
              <Col span={10}>   
                <List
                  header={<h3 >Posts</h3>}
                  className="list-item"
                  bordered
                  itemLayout="vertical"
                  dataSource={Object.keys(this.props.posts)
                    .map(key => this.props.posts[key])
                    .filter(post => 
                      (post.category === category || category === undefined)
                      && (post.deleted === false)
                    ).sort(this.orderBy)}
                  renderItem= {
                    post => (
                      <List.Item key={post.id}
                        className="list-item"
                        actions={[
                          <Link to={'/posts/edit/' + post.id}><Icon type="edit" /></Link>, 
                          <Popconfirm title="Are you sure delete this task?" 
                            onConfirm={() => this.handleDeletePost(post.id)} 
                            onCancel={() => {}} 
                            okText="Yes" 
                            cancelText="No">
                              <Icon type="delete" /> 
                          </Popconfirm>
                          , 
                          <Icon type="like" onClick={() => this.handlePostVote(post.id)}/>, 
                          <Icon type="dislike" onClick={() => this.handlePostVote(post.id, "downVote")}/>
                        ]}>
                        <List.Item.Meta
                          title={
                            <Link to={`/${post.category}/${post.id}`}>
                              {post.title}
                            </Link>
                          }
                        />      
                        <h4><p>Author: {post.author}</p></h4>
                        <h3><p>{post.body}</p></h3>
                        <p>Votes: {post.voteScore}</p>
                        <p>Comments: {post.commentCount}</p>
                        <p>{moment(post.timestamp).format('LLL')}
                          <span style={{float:"right"}}>
                            Category:{post.category}
                          </span>
                        </p>  
                      </List.Item>
                    )
                  }
                />
              </Col>
              <Col span={1}/>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categories.categories,
    posts: state.posts.posts,
    order: state.posts.postOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchAllPosts()),
    sendPostVote: (postId, voteOption) => dispatch(postVotePost(postId, voteOption)),
    deletePost: (postId) => dispatch(deleteDeletePost(postId)),
    changePostOrder: (order) => dispatch(requestChangePostOrder(order))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView)
