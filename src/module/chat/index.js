import React from 'react';
import './index.css';
import './chat.css';
import axios from 'axios';
import { Icon, Form, TextArea, Button } from 'semantic-ui-react';
import {baseURL} from '../../common';
// websocket相关操作
import handle, {IMEvent} from './wsclient';

/*
  0、初始化通信连接
  1、接收消息
  2、发送消息
*/

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoData: [],
      client: null,
      msg: ''       // 发送的消息
    }
  }
  
  handleMsg = (event) => {
    this.setState({
      msg: event.target.value
    });
  }

  // 接收服务器数据
  receiveMsg = (data) => {
    if(data.content === '对方不在线') {
      console.log(data.content);
      return;
    }
    // 获取服务器返回的数据后，直接更新本地数据即可
    let newList = [...this.state.infoData];
    newList.push(JSON.parse(data.content));
    this.setState({
      infoData: newList
    })
  }

  // 发送消息
  sendMsg = (data) => {
    let {to_user,from_user,avatar} = this.props.chatInfo;
    let {infoData, client, msg} = this.state;
    // 封装消息数据包
    let pdata = {
      id: Math.random() + '',
      from_user: from_user,
      to_user: to_user,
      avatar: avatar,
      chat_msg: msg
    }
    // 更新本地聊天信息
    let newList = [...infoData];
    newList.push(pdata);
    this.setState({
      infos: newList
    });
    // 发送聊天信息
    client.emitEvent(IMEvent.MSG_TEXT_SEND,JSON.stringify(pdata));
  }

  componentDidMount = async () => {
    let {to_user,from_user,avatar} = this.props.chatInfo;
    let ret = await axios.post('chats/info', {
      from_user: from_user,
      to_user: to_user
    });
    // 更新列表数据
    this.setState({
      infoData: ret.data.list
    });

    // 初始化聊天客户端，并且在回调函数中获取对方的聊天信息
    let currentUserId = sessionStorage.getItem('uid');
    let wsclient = handle(currentUserId, (data) => {
      // 接收服务器返回的数据
      this.receiveMsg(data);
    });
    this.setState({
      client: wsclient
    });
  }

  render() {
    let {close} = this.props;
    let infolist = this.state.infoData.map(item=>{
      // 控制类名，从而保证不同的用户样式不同
      let currentUser = parseInt(sessionStorage.getItem('uid'), 10);
      let cls = currentUser===item.from_user? 'chat-info-left':'chat-info-right';
      return (
        <li key={item.id} className={cls}>
          <img src={item.avatar} alt=""/>
          <span>{item.chat_msg}</span>
        </li>
      )
    });
    return (
      <div className='chat-window'>
        <div className="chat-window-title">
          <Icon onClick={close} name='angle left' className='chat-ret-btn' size='large'/>
          <span>名字</span>
        </div>
        <div className="chat-window-content">
          <ul>
            {infolist}
          </ul>
        </div>
        <div className="chat-window-input">
          <Form>
            <TextArea value={this.state.msg} onChange={this.handleMsg} placeholder='请输入内容...' />
            <Button>关闭</Button>
            <Button primary onClick={this.sendMsg}>发送</Button>
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
      open: false,    // 控制聊天窗口的显示和隐藏
      chatInfo: {}
    }
  }
  
  componentDidMount = async () => {
    let ret = await axios.post('chats/list');
    // 更新数据
    this.setState({
      listData: ret.data.list
    });
  }

  toChat = (p) => {
    console.log(p)
    // 显示聊天窗口
    this.setState({
      open: true,
      chatInfo: {
        to_user: p.to_user,
        from_user: p.from_user,
        username: p.username,
        avatar: p.avatar
      }
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
        <li key={item.id} onClick={(e) => this.toChat(item)}>
          <div className="avarter">
            <img src={item.avatar} alt="avarter"/>
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
        {this.state.open && <ChatWindow chatInfo={this.state.chatInfo} close={this.closeWindow}/>}
      </div>
    );
  }
}

export default Chat;