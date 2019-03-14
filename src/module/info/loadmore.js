import React from 'react';
import Tloader from 'react-touch-loader';
import { Tab, Item, Icon } from 'semantic-ui-react';
import './loadmore.css';
import axios from 'axios';

class LoadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,   // 是否还有更多数据
      initializing: 1, // 进度条开始
      pagenum: 0,      // 当前记录数
      pagesize: 2,     // 每页加载条数
      listData: [],    // 列表数据
      total: 0         // 总条数
    }
  }

  componentDidMount = async () => {
    let {param} = this.props;
    let ret = await axios.post('infos/list', {
      pagenum: this.state.pagenum,
      pagesize: this.state.pagesize,
      type: param.type
    });
    // 更新数据
    this.setState({
      listData: ret.data.list.data,
      total: ret.data.list.total
    });
  }

  // 下拉刷新数据
  refresh = () => {
    console.log('下拉刷新数据')
  }

  // 加载更多数据
  loadMore = () => {
    console.log('加载更多数据')
  }

  // 产生内容
  produceContent = (type) => {
    let listContent = [];
    if(type === 1 || type === 2) {
      // 资讯和头条的内容类似
      this.state.listData.forEach(item=>{
        let itemInfo = (
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
        listContent.push(itemInfo);
      });
    }
    return listContent;
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
