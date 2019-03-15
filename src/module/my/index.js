import React from 'react';
import { Grid, Icon, Button } from 'semantic-ui-react';
import './index.css';
import {baseURL} from '../../common';

class My extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      avatarPath: ''
    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className='my-container'>
        <div className='my-title'>
          <img src={baseURL+'public/my-bg.png'} alt='me'/>
          <div className="info">
            <div className="myicon">
              <img src={this.state.avatarPath} alt="icon"/>
            </div>
            <div className='name'>{this.state.uname}</div>
            <Button color='green' size='mini'>已认证</Button>
            <div className='edit'>编辑个人资料</div>
          </div>
        </div>
        <Grid padded  className='my-menu'>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Icon name='clock outline' size='big' />
              <div>看房记录</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='yen sign' size='big' />
              <div>我的订单</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='bookmark outline' size='big' />
              <div>我的收藏</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='user outline' size='big' />
              <div>个人资料</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='home' size='big' />
              <div>身份认证</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name='microphone' size='big' />
              <div>联系我们</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className='my-ad'>
          <img src={baseURL+'public/ad.png'} alt=""/>
        </div>
      </div>
    );
  }
}

export default My;