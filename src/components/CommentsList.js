import React from 'react'
import { List, Button } from 'antd'
import moment from 'moment'

const CommentsList = (props) => {
    return (
      <div>
        <div className="flex-container">
          <h3>Comments: {props.comments.length}</h3>
        </div>
        <br/>
        <List
          bordered
          dataSource={props.comments}
          renderItem= {
            comment => (<List.Item >
             <div>
              <p><strong>Author:</strong> {comment.author}</p>
              <p>{comment.body}</p>
              <p>Votes: {comment.voteScore}</p>
              <p>{moment(comment.timestamp).format('LLL')}</p>
              <p>
                <Button shape="circle" icon="like" style={{margin:10}} 
                  onClick={() => props.voteHandlerUp(comment)}/> 
                <Button shape="circle" icon="dislike" style={{margin:10}}
                  onClick={() => props.voteHandlerDown(comment)}/>
                <Button shape="circle" icon="edit" style={{margin:10}}
                  onClick={() => props.editHandler(comment)}/>
                <Button shape="circle" icon="delete" style={{margin:10}}
                  onClick={() => props.deleteHandler(comment)}/>
              </p>
            </div>
              </List.Item>)
          }
          style={{ width:"50%", margin:"auto"}}
        />
      </div>
    )
}

export default CommentsList