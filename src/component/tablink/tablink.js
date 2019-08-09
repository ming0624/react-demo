import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import '../../index.css'
@withRouter
@connect(
  state=>state.chat
)
class TabLinkBar extends React.Component{
  static proptypes = {
    data: PropTypes.array.isRequired
  }
  render(){
    const tabList = this.props.data.filter(v=>!v.hide);
    const {pathname} = this.props.location;
    console.log(pathname)
    return (
      <div className='fixed-footer'>
        <TabBar>
          {
            tabList.map(v=>(
              <TabBar.Item
                badge={v.path==='/msg' ? this.props.unRead : 0}
                title={v.text}
                key={v.path}
                icon={{uri:require(`./img/${v.icon}.png`)}}
                selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                selected={v.path === pathname}
                onPress={()=>{
                  this.props.history.push(v.path)
                }}
              >
              </TabBar.Item>
            ))
          }
        </TabBar>
      </div>
    )
  }
}

export default TabLinkBar