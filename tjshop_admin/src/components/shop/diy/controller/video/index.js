import React, { Component } from "react";
import { View } from "react-web-dom";
import { Input, Form,Upload, message, Button, Icon } from "antd";
import { formItemLayout } from "@/components/shop/diy/formLayout";
import PhotoGallery from "@/components/public/photoGallery";
import { UploadGroupImage } from "@/components/uploadImage";

const FormItem = Form.Item;

//
// type Props = {
//     componentName: string,
//     getValues: Function,
//     options: {},
//     data: { url: string }
// }
// type State = {}
/*<p>目前只支持腾讯视频，请填写完整的带有vid或者sid的视频地址，如：http://v.qq.com/xxx.html?vid=xxxx，默认用我们的广告视频</p>*/
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== '上传中...') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === '上传完成') {
        message.success(`${info.file.name} 上传成功`);



        // getValues({
        //     options,
        //     data: { ...data, ...{ url: e.target.value } }
        // });


      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

export default class Index extends Component {

    static defaultProps = {
        componentName: "video"
    };

    state = {
      photoGalleryVisible: false,
      photoGalleryOnOk: (e) => {
      },
    }

    openPhotoGallery = ({ photoGalleryOnOk }) => {
      this.setState({
          photoGalleryVisible: true,
          photoGalleryOnOk
      });
  };
  onCancelPhotoGallery = () => {
      this.setState({
          photoGalleryVisible: false
      });
  };
  onOkPhotoGallery = (e) => {
      this.state.photoGalleryOnOk(e);
      this.onCancelPhotoGallery();
  };

    render() {
        const { options, data, getValues } = this.props;
        let { url } = data;
        url = url ? [url] : []
        console.log(url);
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="视频上传"
                >  
                {/* <Button
                  onClick={(onChange, values) => {
                    this.openPhotoGallery({
                        photoGalleryOnOk: (e) => {
                            e.length = 1;
                            values = e ? e : [];
                            onChange([ ...e]);
                        }
                    });
                  }}
                  >上传</Button> */}
                 <UploadGroupImage
                    url={url}
                    type={2}
                    single={true}
                    onDel={()=>{
                      getValues({
                        options,
                        data: { ...data, ...{ url: '' } }
                    });
                    }}
                    onClick={(onChange, values) => {
                        this.openPhotoGallery({
                            photoGalleryOnOk: (e) => {
                                e.length = 1;
                                getValues({
                                  options,
                                  data: { ...data, ...{ url: e[0] } }
                              });
                                values = e ? e : [];
                                onChange([ ...e]);
                            }
                        });
                    }}
                />
                    {/* <Upload {...props}>
                        <Button>
                        <Icon type="upload" /> 点击上传
                        </Button>
                    </Upload> */}
                    {/* <Input
                        value={url}
                        onChange={(e) => {
                            getValues({
                                options,
                                data: { ...data, ...{ url: e.target.value } }
                            });
                        }}
                    /> */}
                      
                </FormItem>
                <PhotoGallery
                type={2}
                visible={this.state.photoGalleryVisible}
                onCancel={this.onCancelPhotoGallery}
                onOk={this.onOkPhotoGallery}
            />
            </Form>
        );
    }

    handleUpload() {
        
    }
}
