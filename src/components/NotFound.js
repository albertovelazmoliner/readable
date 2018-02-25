import React from 'react'
import { Card, Icon, Button } from 'antd'

const NotFound = (props) => {
  return (
    <div style={{padding:"100px"}}>
      <Card 
        style={{ width:"50%", margin:"auto"}}
        title="Something's wrong here..."
        actions={[
          <Button href="mailto:albertovelaz@gmail.com">
            Contact with us
          </Button>,
          <Button type="primary" icon="home"
          onClick={() => window.location.replace('/')}>Home</Button>
        ]}
      >
        <h1>404</h1>
        <p>We can't find the page you're looking for. Contact with us or head back to home</p>
      </Card>
    </div>
  )
}

export default NotFound