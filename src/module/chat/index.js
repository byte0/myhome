import React from 'react';
import './index.css';
import './chat.css';
import axios from 'axios';
import { Icon, Form, TextArea, Button } from 'semantic-ui-react';
import {baseURL} from '../../common';

class ChatWindow extends React.Component {
  render() {
    let {close} = this.props;
    return (
      <div className='chat-window'>
        <div className="chat-window-title">
          <Icon onClick={close} name='angle left' className='chat-ret-btn' size='large'/>
          <span>名字</span>
        </div>
        <div className="chat-window-content">
          <ul>
            <li>列表信息</li>
          </ul>
        </div>
        <div className="chat-window-input">
          <Form>
            <TextArea placeholder='请输入内容...' />
            <Button>关闭</Button>
            <Button primary>发送</Button>
          </Form>
        </div>
      </div>
    );
  }
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      open: false    // 控制聊天窗口的显示和隐藏
    }
  }
  
  componentDidMount = async () => {
    let ret = await axios.post('chats/list');
    // 更新数据
    this.setState({
      listData: ret.data.list
    });
  }

  toChat = () => {
    // 显示聊天窗口
    this.setState({
      open: true     
    });
  }

  // 关闭聊天窗口
  closeWindow = () => {
    this.setState({
      open: false
    });
  }

  render() {
    let listInfo = this.state.listData.map(item=>{
      return (
        <li key={item.id} onClick={(e) => this.toChat()}>
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
        {this.state.open && <ChatWindow close={this.closeWindow}/>}
      </div>
    );
  }
}

export default Chat;