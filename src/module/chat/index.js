import React from 'react';
import './index.css';
import axios from 'axios';
import {baseURL} from '../../common';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: []
    }
  }
  
  componentDidMount = async () => {
    let ret = await axios.post('chats/list');
    // 更新数据
    this.setState({
      listData: ret.data.list
    });
  }

  render() {
    let listInfo = this.state.listData.map(item=>{
      return (
        <li key={item.id} onClick={(e) => this.toChat(e,{item})}>
          <div className="avarter">
            <img src={baseURL + item.avatar} alt="avarter"/>
            <span className="name">{item.username}</span>
            <span className="info">{item.chat_msg}</span>
            <span className="time">{item.ctime}</span>
          </div>
        </li>
      );
    });
    return (
      <div className='chat-container'>
        <div className="chat-title">聊天</div>
        <div className="chat-list">
          <ul>
            {listInfo}
          </ul>
        </div>
      </div>
    );
  }
}

export default Chat;