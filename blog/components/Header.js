import React, { useState, useEffect } from "react";
import "../public/style/components/header.css"
import { Row, Col, Menu } from "antd";
import * as Icon from "@ant-design/icons";
import Router from "next/router";
import Link from "next/link"
import axios from "axios";
import servicePath from '../config/apiUrl'
const Header = () => {

    const [newArray, setNewArray] = useState([])
    const fetchData = async () => {
        const result = await axios(servicePath.getTypeInfo).then(res => {
            return res.data.data
        })
        setNewArray(result)
    }

    useEffect(() => { fetchData() }, []);

    const handleClick = (e) => {
        console.log(e)
        if (e.key == 0) {
            Router.push("/")
        } else {
            Router.push('/list?id=' + e.key + "&type=" + e.item.props.name)
        }

    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">
                        <Link href={{ pathname: '/' }}>
                            <a>新之助</a>
                        </Link>
                    </span>
                    <span className="header-txt">专注前端开发</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            {React.createElement(
                                Icon['HomeOutlined'],
                            )}
                        博客首页
                    </Menu.Item>
                        {
                            newArray.map(item => {
                                return (
                                    <Menu.Item key={item.id} name={item.typeName}>
                                        {React.createElement(
                                            Icon[item.icon],
                                        )}
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header;