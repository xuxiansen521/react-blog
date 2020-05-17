import React, { useState, useEffect } from "react";
import { Row, Col, Timeline } from "antd";
import Header from '../components/Header';
import Author from "../components/Author";
import Footer from "../components/Footer";
import axios from 'axios';
import servicePath from '../config/apiUrl'
import { Link } from "react-router-dom";
import { AccountBookOutlined } from "@ant-design/icons"

const Record = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const getArticleList = async () => {
            const res = await axios(servicePath.getArticleList)
            setList(res.data.data)
        }
        getArticleList()
    }, [])

    return (
        <div>
            <Header></Header>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div style={{ margin: "50px auto" }}>
                        <Timeline mode="alternate" >
                            <Timeline.Item dot={<AccountBookOutlined style={{ fontWeight: '500' }} />}>
                                <p style={{ color: "deeppink" }}>当前共计{list.length}篇日志,继续加油哦!</p>
                            </Timeline.Item>
                            {
                                list.map((item, index) => {
                                    return (
                                        <Timeline.Item key={index}>
                                            <Link to={'/detailed/' + item.id}> <p style={{ color: "deeppink" }}>{item.title}</p></Link>
                                            <p style={{ color: "#999" }}>{item.addTime}</p>
                                        </Timeline.Item>
                                    )
                                })
                            }
                            <Timeline.Item >
                                <p style={{ color: "deeppink" }}>正式成为一名切图仔</p>
                                <p style={{ color: "#999" }} >2017-3-2</p>
                            </Timeline.Item>
                        </Timeline>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={5}>
                    <Author />
                </Col>
            </Row>
            <Footer />
        </div>
    )
}

export default Record