import React, { useState } from "react";
import { Spin, Card, Input, Button, message } from "antd"
import "antd/dist/antd.css";

import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import "../static/css/Login.css";
import servicePath from "../config/apiUrl";
import axios from "axios"


function Login(props) {
    const [userName, setUsername] = useState("xuxin");
    const [password, setPassword] = useState("123456");
    const [isLoading, setIsLoading] = useState(false);
    const checkLogin = () => {
        setIsLoading(true);
        if (!userName) {
            message.error('用户名不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
            return false
        } else if (!password) {
            message.error("密码不能为空")
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
            return false
        }
        let data = {
            userName, password
        }
        axios({
            method: "POST",
            url: servicePath.checkLogin,
            data: data,
            withCredentials: true,
        }).then(res => {
            setIsLoading(false)
            if (res.data.data === '登陆成功') {
                localStorage.setItem('openId', res.data.openId)
                props.history.push('/index')
            } else {
                message.error('用户名密码错误')
            }
        })
    }
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="Blog System" bordered={true} style={{ width: 400 }}>
                    <Input
                        id="username"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setUsername(e.target.value) }}
                        onPressEnter={checkLogin}
                    />
                    <br />
                    <br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setPassword(e.target.value) }}
                        onPressEnter={checkLogin}
                    />
                    <br />
                    <br />
                    <Button type="primary" size="large" block onClick={checkLogin} >Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login