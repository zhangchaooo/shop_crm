import React, { Component } from "react";
import { connect } from "dva";
import { Form, Input, Button, Card, message, Spin, Modal } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
// import UploadImage from "@/components/uploadImage";
import PhotoGallery from "@/components/public/photoGallery";
import { UploadGroupImage } from "@/components/uploadImage";

const { TextArea } = Input;
const FormItem = Form.Item;

@Form.create()
@connect(({ shop, loading }) => ({
    shopInfo: shop.info.data,
    shopInfoLoading: loading.effects["shop/info"],
    setBaseInfoLoading: loading.effects["shop/setBaseInfo"]
}))
class ShopInfo extends Component {
    static defaultProps = {
        shopInfo: {
            info: {}
        },
        shopInfoLoading: true,
        setBaseInfoLoading: false
    };

    state = {
        url: [],
        photoGalleryVisible: false,
        photoGalleryOnOk: (e) => {
        },
        previewVisible: false,
        previewImage: "",
        imageErr: '建议尺寸：200 x 200 像素小于120KB，支持.jpg、.gif、.png格式'
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
    previewCancel = () => {
        this.setState({
            previewVisible: false
        });
    };
    // : { previewImage: string }
    openPreviewModal = ({ previewImage }) => {
        this.setState({
            previewVisible: true,
            previewImage
        });
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "shop/info"
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { logo } = values;
            if (!logo || !logo.length) {
                this.setState({imageErr:'请上传店铺logo'});
                // this.props.form.setFields({
                //     logo: {value: '', errors: '请上传店铺logo' }
                // })
              }
            const { dispatch } = this.props;
            if (!err) {
                dispatch({
                    type: "shop/setBaseInfo",
                    payload: {...values, logo: logo[0]},
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("已保存");
                        } else {
                            message.error(response.message);
                        }
                    }
                });
            } else {
                message.error(err);
            }
        });
    };

    render() {
        const { form, shopInfo, setBaseInfoLoading, shopInfoLoading } = this.props;
        const { getFieldDecorator } = form;
console.log(this.props);
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <Spin spinning={shopInfoLoading}>
                        <Form onSubmit={this.handleSubmit} style={{ maxWidth: "600px" }}>
                            <FormItem
                                {...formItemLayout}
                                help={this.state.imageErr}
                                label="店铺logo"
                                // extra="建议尺寸：200 x 200 像素小于120KB，支持.jpg、.gif、.png格式"
                                // label="店铺logo"
                            >
                                {getFieldDecorator("logo", {
                                    // initialValue: shopInfo && shopInfo.logo,
                                    // rules: [{
                                    //     required: true,
                                    //     message: "请上传Logo"
                                    // }],
                                    // valuePropName: "url"
                                    initialValue: shopInfo && [shopInfo.logo],
                                    valuePropName: "url"
                                })(
                                    <UploadGroupImage
                                        single={true}
                                        onDel={()=>{
                                            let { url } = this.state;
                                            url = [];
                                            this.setState({url,imageErr: '请上传店铺logo'})}
                                        }
                                        onClick={(onChange, values) => {
                                            this.openPhotoGallery({
                                                photoGalleryOnOk: (e) => {
                                                    if (e.length) {
                                                        this.setState({imageErr: '建议尺寸：200 x 200 像素小于120KB，支持.jpg、.gif、.png格式'});
                                                      }
                                                    e.length = 1;
                                                    let { url } = this.state;
                                                    url = e;
                                                    this.setState({url});
                                                    values = e ? e : [];
                                                    onChange([ ...e]);
                                                }
                                            });
                                        }}
                                        preview={(previewImage) => {
                                            this.openPreviewModal({
                                                previewImage
                                            });
                                        }}
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="店铺名称"
                                {...formItemLayout}
                            >
                                {getFieldDecorator("name", {
                                    initialValue: shopInfo && shopInfo.name,
                                    rules: [{
                                        required: true,
                                        message: "Please input shop name!"
                                    }]
                                })(
                                    <Input
                                        placeholder="输入店铺名称"
                                        style={{ width: "100%" }}
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="联系电话"
                            >
                                {getFieldDecorator("contact_number", {
                                    initialValue: shopInfo && shopInfo.contact_number
                                })(
                                    <Input
                                        placeholder="输入联系电话"
                                        style={{ width: "100%" }}
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="店铺简介"
                                extra="微信分享店铺给好友时会显示这里的文案"
                            >
                                {getFieldDecorator("description", {
                                    initialValue: shopInfo && shopInfo.description
                                })(
                                    <TextArea
                                        placeholder="请输入简介"
                                        autosize={{ minRows: 3, maxRows: 6 }}
                                        style={{ width: "100%" }}
                                    />
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" loading={setBaseInfoLoading}>保存</Button>
                            </FormItem>
                        </Form>
                        <PhotoGallery
                            visible={this.state.photoGalleryVisible}
                            onCancel={this.onCancelPhotoGallery}
                            onOk={this.onOkPhotoGallery}
                        />
                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.previewCancel}>
                            <img alt="example" style={{ width: "100%" }} src={this.state.previewImage} />
                        </Modal>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 6
        }
    }
};
export default ShopInfo;
