import React from 'react';
import { Avatar, Divider, Popover } from "antd";
import { GithubOutlined, QqOutlined, WechatOutlined, EnvironmentOutlined, MailOutlined } from "@ant-design/icons";
import "../style/components/author.css";
// import { Link } from 'next/link';

const Author = () => {
    
    return (
        <div className="author-div comm-box cssAnimationRight">
            <div>
                <Avatar size={100} src="http://127.0.0.1:7001/public/images/xx.jpeg" ></Avatar>
            </div>
            <div className="author-introduction">
                <div className="myname">新之助</div>
                <EnvironmentOutlined />上海-浦东 <br />
                   前端: React + Antd Design <br />
                   后端: Egg.js + mysql <br />
                <MailOutlined /> xxbb103629@163.com
                <br/>
                <br/>
                <span id="xx">一个前端切图仔～</span>
                <Divider>
                    社交账号
                </Divider>
                <a href="https://github.com/xuxiansen521" target="_blank">
                    <Avatar size={28} icon={<GithubOutlined />} className="account" ></Avatar>
                </a>
                <Popover placement="bottom" content={"QQ:175848675"}  trigger="hover">
                    <Avatar size={28} icon={<QqOutlined />} className="account" ></Avatar>
                </Popover>
                <Popover placement="bottom" content={"WeChat:15021519625"} trigger="hover">
                    <Avatar size={28} icon={<WechatOutlined />} className="account"></Avatar>
                </Popover>
            </div>
        </div>
    )
};

export default Author