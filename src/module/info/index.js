import React from 'react';
import { Tab, Item } from 'semantic-ui-react';
import './index.css';
import axios from 'axios';

class InfoContent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      type: 1,
      pagenum: 0,
      pagesize: 2
    }
  }

  componentDidMount = async () => {
    let { type, pagenum, pagesize } = this.state;
    // 加载列表数据
    let ret = await axios.post('infos/list', {
      pagenum: pagenum,
      pagesize: pagesize,
      type: type
    });
    // 更新数据
    this.setState({
      listData: ret.data.list.data
    });
  }

  render() {
    let itemContent = this.state.listData.map(item=>{
      return (
        <Item key={item.id}>
          <Item.Image size='small' src='http://47.96.21.88:8086/public/1.png' />
          <Item.Content verticalAlign='middle'>
            <Item.Header className='info-title'>{item.info_title}</Item.Header>
            <Item.Meta>
              <span className='price'>$1200</span>
              <span className='stay'>1 Month</span>
            </Item.Meta>
          </Item.Content>
        </Item>
      );
    });
    return (
      <div>
        <ul>
          {itemContent}
        </ul>
      </div>
    );
  }
}

class Info extends React.Component {
  render() {
    const panes = [
      {menuItem: '资讯', render: () => <Tab.Pane><InfoContent/></Tab.Pane>},
      {menuItem: '头条', render: () => <Tab.Pane>头条</Tab.Pane>},
      {menuItem: '问答', render: () => <Tab.Pane>问答</Tab.Pane>}
    ];
    return (
      <div className='find-container'>
        <div className="find-topbar">资讯</div>
        <div className="find-content">
          <Tab panes={panes}/>
        </div>
      </div>
    );
  }
}

export default Info;