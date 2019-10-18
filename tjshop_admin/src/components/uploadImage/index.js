import React, { Component } from "react";
import { Icon, Upload, message } from 'antd';
import { View } from "@/components/flexView";
import styles from './index.css'
import { imageUpload } from "@/utils";
import ImageGroup from "./imageGroup";

export default class UploadImage extends Component {
    static defaultProps = {
        is_save: 0,
    }
    triggerChange = (e) => {
        const {
            onChange
        } = this.props
        if (onChange) {
            onChange(e.file.response.data.url)
        } else {
            message.warning('没有提供onChange属性');
        }
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
        //   getBase64(info.file.originFileObj, imageUrl => this.setState({
        //     imageUrl,
        //     loading: false,
        //   }));
        this.triggerChange(info)
        }
        // this.props.dispatch({
        //     type: 'global/imageUpload',
        //     payload: { images: info.file }
        // })
      }

    render() {
        const {
            children,
            is_save,
            type,
        } = this.props
        return (
            <Upload
                listType={children ? 'text' : 'picture-card'}
                showUploadList={false}
                beforeUpload={beforeUpload}
                // customRequest={(e) => {
                //     console.log(e);
                //     imageUpload({
                //         file:e.file,
                //         onSuccess: this.triggerChange,
                //         is_save,
                //     })
                // }}
                action='/api/admin/upload_image'
                name='images'
                onChange={this.handleChange.bind(this)}
            >
                {
                    children
                        ? this.props.children
                        : this.defaultView()
                }
            </Upload>
        )
    }

    defaultView() {
        const {
            url
        } = this.props
        if (url) {
            return (
                <img
                    src={url}
                    alt=''
                    style={{ width: '80px' }}
                />
               
            )
        } else {
            return (
                <View className={styles.uploadBtn}>
                    <Icon type='plus' />
                    <p>Upload</p>
                </View>
            )
        }
    }
}

export class UploadGroupImage extends Component{
    static defaultProps = {
        preview: () => {
        },
        onChange: (e) => {
        }
    }
    triggerChange = (e) => {
        const { onChange, url } = this.props
        if (onChange) {
            onChange([...url ? url : [], e.origin.path])
        } else {
            message.warning('没有提供onChange属性');
        }
    }

    render() {
        const { url, onChange, onClick, preview,single,onDel, size, type } = this.props

        const sizeStyle = size ? {width:size,height:size } : type==2?{width:'200px', height: '120px'} :{}

        return (
            <View style={sizeStyle} className={styles.view1}>
                <ImageGroup
                    type={type}
                    size={size}
                    url={url ? url : []}
                    onChange={(e) => {
                        onChange(e)
                    }}
                    onDel={onDel}
                    onClick={onClick}
                    preview={preview}
                    addButton={ single && url&&url.length?'':
                        <View
                            style={sizeStyle}
                            className={styles.uploadView}
                            onClick={() => {
                                onClick(onChange, url)
                            }}
                        >
                            <Icon type='plus' />
                            <span style={{lineHeight: 1.5}}>上传</span>
                        </View>
                    }
                />

            </View>
        )
    }
}


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
