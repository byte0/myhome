import React from 'react';
import './index.css';

class Chat extends React.Component {
  render() {
    return (
      <div className='chat-container'>
        <div className="chat-title">聊天</div>
        <div className="chat-list">
          <ul>
            <li>列表</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Chat;