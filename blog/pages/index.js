import React, { useState } from "react";
import Head from 'next/head'
import { Row, Col, List } from "antd";
import Link from "next/link"
import axios from "axios"
import { CalendarOutlined, FolderOutlined, FireOutlined } from "@ant-design/icons"
import Header from '../components/Header';
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../public/style/pages/index.css";
import servicePath from '../config/apiUrl';

import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css"

const Home = (list) => {
	const [mylist, setMylist] = useState(list.data)

	const renderer = new marked.Renderer();

	marked.setOptions({
		renderer: renderer,//必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
		gfm: true,//启动类似Github样式的Markdown,填写true或者false
		pedantic: false,//只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
		sanitize: false,//原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
		tables: true,//支持Github形式的表格，必须打开gfm选项
		breaks: false,//支持Github换行符，必须打开gfm选项，填写true或者false
		smartLists: true,//优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
		smartypants: false,
		highlight: function (code) {
			return hljs.highlightAuto(code).value; //高亮显示规则 ，这里我们将使用highlight.js来完成
		}
	});
	
	return (
		<div>
			<Head>
				<title>Home</title>
			</Head>
			<Header />
			<Row className="comm-main" type="flex" justify="center">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
					<List
						header={<div>最新日志</div>}
						itemLayout="vertical"
						dataSource={mylist}
						renderItem={item => (
							<List.Item>
								<div className="list-title">
									<Link href={{ pathname: '/detailed', query: { id: item.id } }}><a>{item.title}</a></Link>
								</div>
								<div className="list-icon">
									<span><CalendarOutlined /> {item.addTime}</span>
									<span><FolderOutlined /> {item.typeName}</span>
									<span><FireOutlined /> {item.view_count}人</span>
								</div>
								<div className="list-context" 
									dangerouslySetInnerHTML={{ __html: marked(item.introduce)}}
								></div>
							</List.Item>
						)}
					/>
				</Col>
				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={5}>
					<Author />
					<Advert />
				</Col>
			</Row>
			<Footer />
		</div>
	)
}

Home.getInitialProps = async () => {
	const promise = new Promise((resolve, rejest) => {
		axios(servicePath.getArticleList).then(res => {
			resolve(res.data)
		})
	})
	return await promise
}

export default Home
