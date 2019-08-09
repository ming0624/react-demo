import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelect extends React.Component{
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state ={}
  }
  render(){
    const avatarList = 'boy,bull,chick,pig'.split(',').map(ele => ({
      icon: require(`../img/${ele}.png`),
      text: ele,
    }));
    const isSelect = this.state.icon ? (
      <div>
        <span>
          已选择头像
        </span>
        <span>
        <img style={{width:'40px',height:'40px',verticalAlign: 'middle'}} src={this.state.icon} alt=''  />
        </span>
      </div>
    ) : '请选择头像';
    return (
      <div>
        <List renderFooter={() => isSelect}>
          <Grid data={avatarList} columnNum={2} 
          onClick={v => {
            this.setState(v)
            this.props.selectAvatar(v.text)
          }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelect