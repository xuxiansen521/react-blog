import React, { useState } from "react"
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import "../static/css/AdminIndex.css";
import { Route } from "react-router-dom";
import AddArticle from './AddArticle';
import ArticleList from "./ArticleList"

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }

    const handleClickArticle = e => {
        if (e.key == 'addArticle') {
            props.history.push('/index/add')
        } else {
            props.history.push('/index/list/')
        }
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" >
                    <Avatar size={collapsed ? 40 : 100} src="http://127.0.0.1:7001/public/images/xx.jpeg" ></Avatar>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['addArticle']} mode="inline" onClick={handleClickArticle}>
                    
                    <Menu.Item key="addArticle" icon={<PieChartOutlined />}>添加文章</Menu.Item>
                    <Menu.Item key="articleList" icon={<DesktopOutlined />}>文章列表</Menu.Item>

                    <Menu.Item key="9" icon={<FileOutlined />} >
                        留言管理
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        新之助博客
                        <div>
                            <Route path="/index/" exact component={AddArticle} />
                            <Route path="/index/add/" exact component={AddArticle} />
                            <Route path="/index/add/:id" exact component={AddArticle} />
                            <Route path="/index/list/" component={ArticleList} />
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>xx.com</Footer>
            </Layout>
        </Layout>
    );
}

export default AdminIndex;