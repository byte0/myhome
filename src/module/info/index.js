import React from 'react';
import { Tab } from 'semantic-ui-react';
import './index.css';
import LoadMore from './loadmore';

// class InfoContent extends React.Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {
//       listData: [],
//       type: 1,
//       pagenum: 0,
//       pagesize: 2
//     }
//   }

//   componentDidMount = async () => {
//     let { type, pagenum, pagesize } = this.state;
//     // 加载列表数据
//     let ret = await axios.post('infos/list', {
//       pagenum: pagenum,
//       pagesize: pagesize,
//       type: type
//     });
//     // 更新数据
//     this.setState({
//       listData: ret.data.list.data
//     });
//   }

//   render() {
//     let itemContent = this.state.listData.map(item=>{
//       return (
//         <Item key={item.id}>
//           <Item.Image size='small' src='http://47.96.21.88:8086/public/1.png' />
//           <Item.Content verticalAlign='middle'>
//             <Item.Header className='info-title'>{item.info_title}</Item.Header>
//             <Item.Meta>
//               <span className='price'>$1200</span>
//               <span className='stay'>1 Month</span>
//             </Item.Meta>
//           </Item.Content>
//         </Item>
//       );
//     });
//     return (
//       <div>
//         <ul>
//           {itemContent}
//         </ul>
//       </div>
//     );
//   }
// }

function InfoContent() {
  let param = {
    type: 1
  }
  return <LoadMore param={param}/>;
}


// class TopContent extends React.Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {
//       listData: [],
//       type: 2,
//       pagenum: 0,
//       pagesize: 2
//     }
//   }

//   componentDidMount = async () => {
//     let { type, pagenum, pagesize } = this.state;
//     // 加载列表数据
//     let ret = await axios.post('infos/list', {
//       pagenum: pagenum,
//       pagesize: pagesize,
//       type: type
//     });
//     // 更新数据
//     this.setState({
//       listData: ret.data.list.data
//     });
//   }

//   render() {
//     let itemContent = this.state.listData.map(item=>{
//       return (
//         <Item key={item.id}>
//           <Item.Image size='small' src='http://47.96.21.88:8086/public/1.png' />
//           <Item.Content verticalAlign='middle'>
//             <Item.Header className='info-title'>{item.info_title}</Item.Header>
//             <Item.Meta>
//               <span className='price'>$1200</span>
//               <span className='stay'>1 Month</span>
//             </Item.Meta>
//           </Item.Content>
//         </Item>
//       );
//     });
//     return (
//       <div>
//         <ul>
//           {itemContent}
//         </ul>
//       </div>
//     );
//   }
// }

function TopContent() {
  let param = {
    type: 2
  }
  return <LoadMore param={param}/>;
}


// class FaqContent extends React.Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {
//       listData: [],
//       type: 3,
//       pagenum: 0,
//       pagesize: 2
//     }
//   }

//   componentDidMount = async () => {
//     let { type, pagenum, pagesize } = this.state;
//     // 加载列表数据
//     let ret = await axios.post('infos/list', {
//       pagenum: pagenum,
//       pagesize: pagesize,
//       type: type
//     });
//     // 更新数据
//     this.setState({
//       listData: ret.data.list.data
//     });
//   }

//   render() {
//     let itemContent = this.state.listData.map(item=>{
//       return (
//         <li key={item.id}>
//           <div className='title'>
//             <span className='cate'>
//               <Icon color='green' name='users' size='small' />
//               思维
//             </span>
//             <span>
//               {item.question_name}
//             </span>
//           </div>
//           {item.answer_content&&(
//             <div className='user'>
//               <Icon circular name='users' size='mini'/>
//               {item.username} 的回答
//             </div>
//           )}
//           <div className="info">
//             {item.answer_content}
//           </div>
//           <div className="tag">
//             {item.question_tag&&item.question_tag.split(',').map((tag,index)=>{return <span key={index}>{tag}X</span>})}
//             <span>{item.qnum?item.qnum:0}个回答</span>
//           </div>
//         </li>
//       );
//     });
//     return (
//       <div>
//         <ul>
//           {itemContent}
//         </ul>
//       </div>
//     );
//   }
// }

function FaqContent() {
  let param = {
    type: 3
  }
  return <LoadMore param={param}/>;
}


class Info extends React.Component {
  render() {
    const panes = [
      {menuItem: '资讯', render: () => <Tab.Pane><InfoContent/></Tab.Pane>},
      {menuItem: '头条', render: () => <Tab.Pane><TopContent/></Tab.Pane>},
      {menuItem: '问答', render: () => <Tab.Pane><FaqContent/></Tab.Pane>}
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