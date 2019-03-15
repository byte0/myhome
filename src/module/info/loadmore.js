import React from 'react';
import Tloader from 'react-touch-loader';
import { Item, Icon, Button, Modal, TextArea } from 'semantic-ui-react';
import './loadmore.css';
import axios from 'axios';

// 弹窗组件
class QuestionModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }
  submit = () => {
    console.log('submit')
  }
  render() {
    // open是布尔值，表示弹窗显示或者隐藏
    // close 关闭弹窗时触发该事件
    let { open, close } = this.props;
    return (
      <div>
        <Modal size='small' open={open} onClose={close}>
          <Modal.Header>发表评论</Modal.Header>
          <Modal.Content>
            <TextArea style={{width: '100%'}} value={this.state.value} onChange={this.handleChange}  placeholder='请输入问题' />
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={close}>取消</Button>
            <Button positive onClick={this.submit} icon='checkmark' labelPosition='right' content='发表' />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

class LoadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,   // 是否还有更多数据
      initializing: 1, // 进度条开始
      pagenum: 0,      // 当前记录数
      pagesize: 2,     // 每页加载条数
      listData: [],    // 列表数据
      total: 0,        // 总条数
      open: false,     // 控制弹窗显示和隐藏（true表示显示；false表示隐藏）
    }
  }

  // 控制弹窗关闭
  closeWindow = () => {
    // 修改open状态位
    this.setState({
      open: false
    });
  }
  // 控制弹窗显示
  showWindow = () => {
    // 修改open状态位
    this.setState({
      open: true
    });
  }

  loadData = async (flag) => {
    let {param} = this.props;
    let ret = await axios.post('infos/list', {
      pagenum: this.state.pagenum,
      pagesize: this.state.pagesize,
      type: param.type
    });

    let arr = [...this.state.listData];
    if(flag === 1) {
      // 刷新
      arr = [...ret.data.list.data];
    }else if(flag === 2) {
      // 加载更多，向数组中添加数据
      arr.push(...ret.data.list.data);
    }

    // 更新数据
    this.setState({
      listData: arr,
      total: ret.data.list.total,
      initializing: 2
    });
  }

  componentDidMount = async () => {
    this.loadData(1);
  }

  // 下拉刷新数据
  refresh = (resolve) => {
    // 刷新的话应该从新发送请求，并且把pagenu重置成为0,从新加载数据
    this.setState({
      pagenum: 0
    }, ()=>{
      // 重新发送请求加载数据
      this.loadData(1);
      // 完成任务
      resolve();
    });
  }

  // 加载更多数据
  loadMore = (resolve) => {
    // 加载更多的实现思路：
    // 控制pagenum进行累加操作
    let pn = this.state.pagenum + this.state.pagesize;
    this.setState({
      pagenum: pn,
      hasMore: pn < this.state.total
    }, () => {
      // 重新加载数据
      this.loadData(2);
      // 完成任务
      resolve();
    })
  }

  // 产生内容
  produceContent = (type) => {
    let listContent = [];
    this.state.listData.forEach(item=>{
      let itemInfo = null;
      if(type === 1 || type === 2) {
        // 资讯和头条的内容类似
        itemInfo = (
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
      }else if(type === 3) {
        itemInfo = (
          <li key={item.id}>
            <div className='title'>
              <span className='cate'>
                <Icon color='green' name='users' size='small' />
                思维
              </span>
              <span>
                {item.question_name}
              </span>
            </div>
            {item.answer_content&&(
              <div className='user'>
                <Icon circular name='users' size='mini'/>
                {item.username} 的回答
              </div>
            )}
            <div className="info">
              {item.answer_content}
            </div>
            <div className="tag">
              {item.question_tag&&item.question_tag.split(',').map((tag,index)=>{return <span key={index}>{tag}X</span>})}
               <span>{item.qnum?item.qnum:0}个回答</span>
             </div>
          </li>
        );
      }
      listContent.push(itemInfo);
    });
    if(type === 1 || type === 2) {
      return (
        <Item.Group unstackable>
          {listContent}
        </Item.Group>
      );
    }else if(type === 3) {
      return (
        <div>
          <QuestionModel open={this.state.open} close={this.closeWindow}/>
          <div className='info-ask-btn'>
            <Button onClick={this.showWindow} fluid color='green'>快速提问</Button>
          </div>
          <ul className='info-ask-list'>{listContent}</ul>
        </div>
      );
    }
  }

  render() {
    let {hasMore, initializing} = this.state;
    let {param} = this.props;
    return (
      <div className="view">
        <Tloader className="main"
          onRefresh={this.refresh}
          onLoadMore={this.loadMore}
          hasMore={hasMore}
          initializing={initializing}>
          <ul>
            {this.produceContent(param.type)}
          </ul>
        </Tloader>
      </div>
    );
  }
}

export default LoadMore;
