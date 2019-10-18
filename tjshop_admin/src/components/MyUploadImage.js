import React from "react";
import { Upload, Icon, message } from 'antd';


function beforeUpload(file) {
  const isImage = file.type.includes('image') !== -1;
  if (!isImage) {
      message.error('你只能上传图片!');
  }
  const isLimit = file.size / 1024 / 1024 < 5;
  if (!isLimit) {
      message.error('图片不能超过5MB!');
  }
  return isImage && isLimit;
}

class MyUploadImage extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
     this.setState({ imageUrl: info.file.response.data.url });
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        action='/api/admin/upload_image'
        name='image'
        className="avatar-uploader"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange.bind(this)}
    >
        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
    </Upload>
    );
  }
}

export default MyUploadImage;


