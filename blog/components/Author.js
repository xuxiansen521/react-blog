import React from 'react';
import { Avatar, Divider } from "antd";
import { GithubOutlined, QqOutlined,WechatOutlined} from "@ant-design/icons";
import "../public/style/components/author.css";

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588077314049&di=4893c80be5d771daec9d4102d605a988&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F06%2F20190106194202_hatxb.thumb.400_0.png" ></Avatar>
            </div>
            <div className="author-introduction">
                   前端切图仔，专注于WEB和移动前端开发。
                <Divider>
                    社交账号
                </Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account" ></Avatar>
                <Avatar size={28} icon={<QqOutlined />} className="account"></Avatar>
                <Avatar size={28} icon={<WechatOutlined />} className="account"></Avatar>
            </div>
        </div>
    )
};

export default Author