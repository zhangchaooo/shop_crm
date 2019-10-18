import React, { Component } from "react";
import { connect } from "dva";
import { formatMessage, FormattedMessage } from "umi/locale";
import { message } from "antd";
import Login from "@/components/login/index";
import styles from "./login.less";

const { UserName, Password, Submit } = Login;

@connect(({ loading }) => ({
    loginLoading: loading.effects["member/login"]
}))
class LoginPage extends Component {
    state = {};

    handleSubmit = (err, values) => {
        const { type } = this.state;
        if (!err) {
            const { dispatch } = this.props;
            dispatch({
                type: "member/login",
                payload: {
                    ...values,
                    type
                },
                callback: (response) => {
                    if (response.code !== 0) {
                        message.error(response.message);
                    }
                }
            });
        }
    };


    render() {
        const { loginLoading } = this.props;
        const { type } = this.state;
        return (
            <div style={{paddingTop: 200}} className={styles.main}>
                <div style={{textAlign: 'center'}}><h1>您好，请登录</h1></div>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    ref={form => {
                        this.loginForm = form;
                    }}
                >
                    <UserName
                        name="username"
                        placeholder={`${formatMessage({ id: "app.login.userName" })}`}
                        rules={[
                            {
                                required: true,
                                message: formatMessage({ id: "validation.userName.required" })
                            }
                        ]}
                    />
                    <Password
                        name="password"
                        placeholder={`${formatMessage({ id: "app.login.password" })}`}
                        rules={[
                            {
                                required: true,
                                message: formatMessage({ id: "validation.password.required" })
                            }
                        ]}
                        onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
                    />

                    <Submit loading={loginLoading}>
                        <FormattedMessage id="app.login.login" />
                    </Submit>
                </Login>
            </div>
        );
    }
}

export default LoginPage;
