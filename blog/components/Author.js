import React from 'react';
import { Avatar, Divider } from "antd";
import { GithubOutlined, QqOutlined, WechatOutlined, EnvironmentOutlined, MailOutlined } from "@ant-design/icons";
import "../public/style/components/author.css";
import { Link } from 'next/link';

const Author = () => {
    const MouseEnterHandle = () => {
        console.log("enter")
    }

    const MouseLeaveHandle = () =>{
        console.log("leave")
    }
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588077314049&di=4893c80be5d771daec9d4102d605a988&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F06%2F20190106194202_hatxb.thumb.400_0.png" ></Avatar>
            </div>
            <div className="author-introduction">
                <div className="myname">新之助</div>
                <EnvironmentOutlined />上海-浦东 <br />
                   前端: React + next.js + Antd Design <br />
                   后端: Egg.js + mysql <br />
                <MailOutlined /> xxbb103629@163.com
                <br />
                <br />
                <span id="xx">一个前端切图仔～</span>
                <Divider>
                    社交账号
                </Divider>
                <a href="https://github.com/xuxiansen521" target="_blank">
                    <Avatar size={28} icon={<GithubOutlined />} className="account" ></Avatar>
                </a>
                <Avatar size={28} icon={<QqOutlined />} className="account" onMouseEnter={MouseEnterHandle} onMouseLeave={MouseLeaveHandle}></Avatar>
                <Avatar size={28} icon={<WechatOutlined />} className="account"></Avatar>
            </div>
        </div>
    )
};

export default Author