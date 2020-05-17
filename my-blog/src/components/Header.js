import React, { useState, useEffect } from "react";
import "../style/components/header.css"
import { Row, Col, Menu } from "antd";
import * as Icon from "@ant-design/icons";
import { Route, Link } from 'react-router-dom';
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

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">
                        <Link to={{ pathname: '/' }}>
                            新之助
                        </Link>
                    </span>
                    <span className="header-txt">专注前端开发</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={8}>
                    <Menu mode="horizontal">
                        <Menu.Item key="0">
                            <Link to="/">
                                {React.createElement(
                                    Icon['HomeOutlined'],
                                )}
                                博客首页
                            </Link>
                        </Menu.Item>
                        {
                            newArray.map(item => {
                                return (
                                    <Menu.Item key={item.id} name={item.typeName}>
                                        <Link to={'/list/' + item.typeName}>
                                            {React.createElement(
                                                Icon[item.icon],
                                            )}
                                            {item.typeName}
                                        </Link>
                                    </Menu.Item>
                                )
                            })
                        }
                        <Menu.Item>
                            <Link to={'/record'}>
                                {React.createElement(
                                    Icon['CopyOutlined'],
                                )}
                                记录
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header;