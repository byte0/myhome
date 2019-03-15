import React from 'react';
import { Grid, Icon, Button, Modal } from 'semantic-ui-react';
import AvatarEditor from 'react-avatar-editor';
import './index.css';
import {baseURL} from '../../common';
import axios from 'axios';

// 图片选择弹窗
class ImageSelectModal extends React.Component {
  constructor(props) {
    super(props);
    // 该属性表示file输入域的引用，用于操作文件上传
    this.fileInput = React.createRef();
  }

  submit = () => {
    // 选中图片之后的操作:获取选择的文件内容；传递给父组件并且关闭窗口
    let fileContent = this.fileInput.current.files[0];
    this.props.close(fileContent);
  }

  render() {
    // 控制弹窗的显示和隐藏
    let { open, close } = this.props;
    return (
      <div>
        <Modal size='small' open={open} onClose={close}>
          <Modal.Header>选择图片</Modal.Header>
          <Modal.Content>
            <input type="file" ref={this.fileInput} />
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={ this.submit } icon='checkmark' labelPosition='right' content='确定' />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

// 图片裁切弹窗
class ImageCropModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1
    }
  }
  handleScale = (event) => {
    // 控制scale值的变化
    let num = parseFloat(event.target.value);
    this.setState({
      scale: num
    });
  }
  // 把裁切好的图片内容提交到后台
  submit = async () => {
    // 得到裁切的图片内容:this.editor.getImageScaledToCanvas()
    // 得到裁切的图片信息后，还要转化为特定的数据格式：base64
    let img = this.editor.getImageScaledToCanvas();
    let imgContent = img.toDataURL();
    // 调用接口发送图片内容
    let ret = await axios.post('my/avatar', {
      avatar: imgContent
    });
    // 更新父组件中图片的内容
    this.props.updateImage(imgContent);
  }

  setEditorRef = (editor) => {
    // 通过非受控的方式操作组件ref
    this.editor = editor;
  }
  render() {
    let { open, close, avatar } = this.props;
    return (
      <div>
        <Modal size='small' open={open} onClose={close}>
          <Modal.Header>裁切图片</Modal.Header>
          <Modal.Content>
            <AvatarEditor
              ref={this.setEditorRef}
              borderRadius={75}
              width={150}
              height={150}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              rotate={0}
              scale={this.state.scale}
              image={avatar}
            />
            <div>
              <span className='avatar-zoom'>缩放:</span>
              <input
                name="scale"
                type="range"
                onChange={this.handleScale}
                min='1'
                max='2'
                step="0.01"
                defaultValue="1"
              />
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={ this.submit } icon='checkmark' labelPosition='right' content='确定' />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

class My extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      avatarPath: '',
      imageOpen: false, // 控制选择图片的弹窗显示和隐藏
      cropOpen: false,  // 控制图片裁切弹窗显示和隐藏
      fileContent: null,// 表示文件的内容
    }
  }
  componentDidMount = async () => {
    // 表示登录用户的id
    let uid = sessionStorage.getItem('uid');
    // 根据用户id查询用户详细信息
    let ret = await axios.post('my/info', {
      user_id: uid
    });
    // 更新数据
    this.setState({
      uname: ret.data.username,
      avatarPath: ret.data.avatar
    });
  }
  // 控制选择图片的弹窗关闭
  closeImageWindow = (file) => {
    // 如果选中了文件，那么file表示文件的内容
    // 如果没有选中文件，那么file表示事件对象
    if(file&&file.target) {
      // 事件对象，也就是没有选中文件
      this.setState({
        imageOpen: false
      });
    }else{
      // 选中文件
      this.setState({
        fileContent: file,
        imageOpen: false, // 隐藏第一个弹窗
        cropOpen: true,   // 显示第二个弹窗
      });
    }
  }
  // 控制选择图片的弹窗显示
  openImageWindow = () => {
    this.setState({
      imageOpen: true
    });
  }

  // 控制裁切图片的弹窗的隐藏
  closeCropWindow = () => {
    this.setState({
      cropOpen: false
    });
  }

  // 更新图片的内容
  updateImage = (img) => {
    this.setState({
      avatarPath: img, // 更新图片内容
      cropOpen: false  // 关闭图片裁切窗口
    });
  }

  render() {
    return (
      <div className='my-container'>
        <ImageSelectModal open={this.state.imageOpen} close={this.closeImageWindow}/>
        <ImageCropModal updateImage={this.updateImage} avatar={this.state.fileContent} open={this.state.cropOpen} close={this.closeCropWindow}/>
        <div className='my-title'>
          <img src={baseURL+'public/my-bg.png'} alt='me'/>
          <div className="info">
            <div className="myicon">
              <img onClick={this.openImageWindow} src={this.state.avatarPath} alt="icon"/>
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