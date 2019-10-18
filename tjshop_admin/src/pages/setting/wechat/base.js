import React, { Component } from "react";
import { connect } from "dva";
import { Card } from "antd";
import { Alert, Switch, Form, Input, Button, message, Upload, Icon, Spin } from "antd";

const FormItem = Form.Item;

@Form.create()
@connect(({ setting, loading }) => ({
    settingInfoLoading: loading.effects["setting/info"],
    settingEditLoading: loading.effects["setting/edit"]
}))
class Payment extends Component {
    static defaultProps = {
        settingInfoLoading: true,
        settingInfo: {
            info: {
                config: {
                    mini_program_app_id: '', mini_program_secret: '', payment_mch_id: '', payment_key: ''
                }
            }
        }
    };
    state = {
        mini_program_app_id: '', mini_program_secret: '', payment_mch_id: '', payment_key: ''
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "setting/info",
            callback: (response) => {
                if (response.code === 0) {
                    // 项目初始化的时候为空
                    // const { config, status } = response.result.info;
                    const {
                        mini_program: {
                            app_id,
                            secret,
                            // token: ,
                            // aes_key: 
                        },
                        payment: {
                            key,
                            mch_id,
                            // key: zhaomengqiaozhaomengqiaozhaomeng,
                            // cert_path: path/to/cert/apiclient_cert.pem",
                            // "key_path": "path/to/cert/apiclient_key.pem"
                        }
                    } = response.data
                    if (app_id && key) {
                        this.setState({
                            mini_program_app_id: app_id, mini_program_secret: secret, payment_mch_id: mch_id, payment_key: key
                        });
                    }
                } else {
                    message.warning(response.message);
                }
            }
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {  mini_program_app_id, mini_program_secret, payment_mch_id, payment_key } = values;
                const { dispatch } = this.props;
                dispatch({
                    type: "setting/edit",
                    payload: {
                        mini_program: {
                            app_id:mini_program_app_id,
                            secret:mini_program_secret,
                        },
                        payment: {
                            app_id:mini_program_app_id,
                            mch_id:payment_mch_id,
                            key:payment_key,
                        }
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("修改成功");
                        } else {
                            message.error(response.message);
                        }
                    }
                });
            } else {
                console.log(err);
            }
        });
    };

    render() {
        const { mini_program_app_id, mini_program_secret, payment_mch_id, payment_key } = this.state;
        const { form, settingEditLoading, settingInfoLoading } = this.props;
        // const name = "cert";
        // TODO 封装起来，这儿我认为是umi.js的一个bug，自动索引出来的域名是http的
        // let action = "/admin/upload/addCert";
        // action = process.env.NODE_ENV === "production" ? process.env.production.api.url + action : action;

        const { getFieldDecorator } = form;
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = { "Access-Token": `Bearer ${token.accessToken}` };
        return (
            <Card bordered={false}>
                <Spin size="large" spinning={settingInfoLoading}>
                    {/* <Alert
                        message="注意：App手机登录、微信登录用户打通"
                        description={
                            <span>
                                    如果您使用了App并且使用了手机登录和微信登录方式，请去配置微信开放平台绑定它们之间的关系，
                                    <a href={`https://www.tjshop.cn/help/login-ways`} target="_blank">
                                        详情请见
                                    </a>
                                </span>
                        }
                        type="info"
                        showIcon
                    /> */}
                    <Form
                        onSubmit={this.handleSubmit}
                        style={{
                            marginTop: 24
                        }}
                    >
                        <FormItem
                            {...formItemLayout}
                            label="mini_program_app_id"
                            // extra="微信支付商户号，审核通过后，会发送到申请时的邮箱"
                        >
                            {getFieldDecorator("mini_program_app_id", {
                                initialValue: mini_program_app_id,
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入"
                                    }
                                ],
                                initialValue: mini_program_app_id
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="mini_program_secret">
                            {getFieldDecorator("mini_program_secret", {
                                initialValue: mini_program_secret,
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入"
                                    }
                                ],
                                initialValue: mini_program_secret
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="payment_mch_id">
                            {getFieldDecorator("payment_mch_id", {
                                initialValue: payment_mch_id
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="payment_key">
                            {getFieldDecorator("payment_key", {
                                initialValue: payment_key
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        {/* <FormItem {...formItemLayout} label="公众号App Id">
                            {getFieldDecorator("app_id", {
                                initialValue: app_id
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="公众号App Secret">
                            {getFieldDecorator("app_secret", {
                                initialValue: app_secret
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="开放平台App Id" help={"用于App内微信支付、微信登陆"}>
                            {getFieldDecorator("appid", {
                                initialValue: appid
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="CERT证书"
                            extra="下载证书 cert.zip 中的 apiclient_cert.pem 文件，微信退款原路退回时所需"
                        >
                            {getFieldDecorator("apiclient_cert", {})(
                                <Upload
                                    name={name}
                                    action={action}
                                    headers={headers}
                                    onChange={e => {
                                        this.onApiclientCertChange(e);
                                    }}
                                    fileList={apiclientCert}
                                >
                                    <Button>
                                        <Icon type="upload" /> 上传证书
                                    </Button>
                                    {Array.isArray(apiclientCert) && apiclientCert.length > 0 ? (
                                        <span style={{ marginLeft: 10, color: "green" }}>
                                                    已上传
                                                </span>
                                    ) : (
                                        <span style={{ marginLeft: 10 }}>未上传</span>
                                    )}
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="KEY密钥文件"
                            extra="下载证书 cert.zip 中的 apiclient_key.pem 文件，微信退款原路退回时所需"
                        >
                            {getFieldDecorator("apiclient_key", {})(
                                <Upload
                                    name={name}
                                    action={action}
                                    headers={headers}
                                    onChange={e => {
                                        this.onApiclientKeyChange(e);
                                    }}
                                    fileList={apiclientKey}
                                >
                                    <Button>
                                        <Icon type="upload" /> 上传证书
                                    </Button>
                                    {Array.isArray(apiclientKey) && apiclientKey.length > 0 ? (
                                        <span style={{ marginLeft: 10, color: "green" }}>
                                                    已上传
                                                </span>
                                    ) : (
                                        <span style={{ marginLeft: 10 }}>未上传</span>
                                    )}
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="回调域名" extra="使用场景：微信支付异步通知、退款原路返回"
                        >
                            {getFieldDecorator("callback_domain", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入回调域名"
                                    }
                                ],
                                initialValue: callback_domain
                            })(<Input placeholder="请输入回调域名，如：https://www.tjshop.cn" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="支付开关">
                            {getFieldDecorator("status", {
                                valuePropName: "checked",
                                initialValue: status === 1
                            })(<Switch />)}
                        </FormItem> */}
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" loading={settingEditLoading}>
                                保存
                            </Button>
                        </FormItem>
                    </Form>
                </Spin>
            </Card>
        );
    }

    // onApiclientCertChange = info => {
    //     let fileList = info.fileList;
    //     fileList = fileList.slice(-1);
    //     fileList = fileList.map(file => {
    //         if (file.response) {
    //             file.path = file.response.result.path;
    //             file.name = "证书";
    //         }
    //         return file;
    //     });
    //     fileList = fileList.filter(file => {
    //         if (file.response) {
    //             return file.response.code === 0;
    //         }
    //         return true;
    //     });
    //     this.setState({ apiclientCert: fileList });
    // };
    // onApiclientKeyChange = info => {
    //     let fileList = info.fileList;
    //     fileList = fileList.slice(-1);
    //     fileList = fileList.map(file => {
    //         if (file.response) {
    //             file.path = file.response.result.path;
    //             file.name = "证书";
    //         }
    //         return file;
    //     });
    //     fileList = fileList.filter(file => {
    //         if (file.response) {
    //             return file.response.code === 0;
    //         }
    //         return true;
    //     });
    //     this.setState({ apiclientKey: fileList });
    // };
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 10,
            offset: 3
        }
    }
};
export default Payment;
