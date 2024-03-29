import React from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter
class UserCard extends React.Component{
  static propTypes ={
    userlist:PropTypes.array.isRequired
  }

  handleClick(v){
    this.props.history.push(`/chat/${v._id}`)
  }
  render(){
    return(
      <WingBlank>
        {this.props.userlist.map(v=>(
          <Card 
            key={v._id}
            onClick={()=>this.handleClick(v)}
          >
            <Card.Header
              key={v._id}
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            /> 
            {v.type==='boss'? <div>公司：{v.money}</div> : null}
            <Card.Body>
              <div>{v.desc.split('\n').map(v=>(
                <div key={v}>{v}</div>
              ))}</div>
            </Card.Body>
            {v.type==='boss'? <div>薪资：{v.money}</div> : null}
          </Card>
        ))}
      </WingBlank>
    )
  }
}

export default UserCard