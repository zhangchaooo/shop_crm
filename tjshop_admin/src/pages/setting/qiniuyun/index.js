import React, { Component } from "react";
import { connect } from "dva";
import { Card } from "antd";
import { Alert, Switch, Form, Input, Button, message, Upload, Icon, Spin } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

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
                    QINIU_ACCESS_KEY: "",
                    QINIU_SECRET_KEY: "",
                    QINIU_BUCKET: "",
                    QINIU_DOMAIN: "",
                }
            }
        }
    };
    state = {
        QINIU_ACCESS_KEY: "",
        QINIU_SECRET_KEY: "",
        QINIU_BUCKET: "",
        QINIU_DOMAIN: "",
    }; 

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "setting/info",
            callback: (response) => {
                if (response.code === 0) {
                    // 项目初始化的时候为空
                    // const { config, status } = response.result.info;
                    const {qiniu: {
                        access_key,
                        secret_key,
                        bucket,
                        domain
                    }} = response.data
   
                        this.setState({
                            QINIU_ACCESS_KEY: access_key,
                            QINIU_SECRET_KEY: secret_key,
                            QINIU_BUCKET: bucket,
                            QINIU_DOMAIN: domain,
                        });
                } else {
                    message.warning(response.message);
                }
            }
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
                const { QINIU_ACCESS_KEY,
                    QINIU_SECRET_KEY,
                    QINIU_BUCKET,
                    QINIU_DOMAIN, } = values;
                const { dispatch } = this.props;
                dispatch({
                    type: "setting/edit",
                    payload: {
                        qiniu: {
                            access_key:QINIU_ACCESS_KEY,
                            secret_key:QINIU_SECRET_KEY,
                            bucket:QINIU_BUCKET,
                            domain:QINIU_DOMAIN,
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
        const { QINIU_ACCESS_KEY,
            QINIU_SECRET_KEY,
            QINIU_BUCKET,
            QINIU_DOMAIN } = this.state;
        const { form, settingEditLoading, settingInfoLoading } = this.props;
        const name = "cert";
        // TODO 封装起来，这儿我认为是umi.js的一个bug，自动索引出来的域名是http的
        let action = "/admin/upload/addCert";
        action = process.env.NODE_ENV === "production" ? process.env.production.api.url + action : action;

        const { getFieldDecorator } = form;
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = { "Access-Token": `Bearer ${token.accessToken}` };
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
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
                        // onSubmit={this.handleSubmit}
                        style={{
                            marginTop: 24
                        }}
                    >
                        <FormItem
                            {...formItemLayout}
                            label="QINIU_ACCESS_KEY"
                            // extra="微信支付商户号，审核通过后，会发送到申请时的邮箱"
                        >
                            {getFieldDecorator("QINIU_ACCESS_KEY", {
                                rules: [
                                    {
                                        // required: true,
                                        message: "请输入"
                                    }
                                ],
                                initialValue: QINIU_ACCESS_KEY
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="QINIU_SECRET_KEY">
                            {getFieldDecorator("QINIU_SECRET_KEY", {
                                rules: [
                                    {
                                        // required: true,
                                        message: "请输入"
                                    }
                                ],
                                initialValue: QINIU_SECRET_KEY
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="QINIU_BUCKET">
                            {getFieldDecorator("QINIU_BUCKET", {
                                rules: [
                                    {
                                        // required: true,
                                        message: "请输入"
                                    }
                                ],
                                initialValue: QINIU_BUCKET
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="QINIU_DOMAIN">
                            {getFieldDecorator("QINIU_DOMAIN", {
                                rules: [
                                    {
                                        // required: true,
                                        message: "请输入"
                                    }
                                ],
                                initialValue: QINIU_DOMAIN
                            })(<Input placeholder="请输入" />)}
                        </FormItem>

                        
                        </Form>
                        
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit} loading={settingEditLoading}>
                                保存
                            </Button>
                        </FormItem>
                </Spin>
            </Card>
            </PageHeaderWrapper>
        );
    }
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
