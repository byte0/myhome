import React from 'react';
import axios from 'axios';
// 导入需要的UI组件
import { Button, Icon, Form, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
// import { baseUrl } from './common';
// 导入样式
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  handleUsername = (event) => {
    this.setState({
      username: event.target.value
    });
  }
  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }
  submit = async () => {
    // 获取表单数据
    // 调用接口进行身份验证 http://47.96.21.88:8086/users/login
    // 服务器返回一个状态：如果登录成功会返回一个状态token
    // 保存token信息到sessionStorage
    // 跳转到主页页
    // console.log(this.state.username)
    // console.log(this.state.password)

    let ret = await axios.post('users/login', {
      uname: this.state.username,
      pwd: this.state.password
    });
    // console.log(ret.data.data.token)
    // 存储token信息到sessionStorage中
    sessionStorage.setItem('mytoken', ret.data.token);
    sessionStorage.setItem('uid', ret.data.uid);
    // 跳转到主页
    let {history} = this.props;
    history.push('/home');
  }
  render() {
    return (
      <div className='login-container'>
        <div className="login-logo">
          <Icon name='home' color='orange' size='massive' />
        </div>
        <div className="login-form">
          <Form>
            <Form.Input 
              icon='user' 
              required 
              size='big' 
              iconPosition='left' 
              name='username'
              value={this.state.username}
              onChange={this.handleUsername}
              placeholder='请输入用户名...' 
            />
            <Form.Input 
              icon='user' 
              required 
              size='big' 
              iconPosition='left' 
              name='username'
              value={this.state.password}
              onChange={this.handlePassword}
              placeholder='请输入用户名...' 
            />
            <Button onClick={this.submit} fluid color='green'>登录</Button>
          </Form>
          <Divider horizontal>---</Divider>
        </div>
        <div className="login-third">
          <Icon name='rocketchat' color='black' size='big' />
          <Icon name='qq' color='black' size='big' />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
