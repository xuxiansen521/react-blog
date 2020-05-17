import React, { useState, useEffect } from "react";
import { Row, Col, List, Pagination } from "antd";
import { Link } from 'react-router-dom';
import axios from "axios"
import { CalendarOutlined, FolderOutlined, FireOutlined } from "@ant-design/icons"
import Header from '../components/Header';
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../style/pages/index.css";
import servicePath from '../config/apiUrl';

import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css"
import { scroll} from "../config/common"
const Home = (props) => {
	const [mylist, setMylist] = useState();
	const [total, setTotal] = useState();
	const [pageNo, setPageNo] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	useEffect(() => {
		getArticleList()
	}, [pageNo])

	const getArticleList = () => {
		axios(servicePath.getArticleList, { params: { pageNo, pageSize } }).then(res => {
			setMylist(res.data.data)
			setTotal(res.data.total)
		})
	}

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
			<Header />
			<Row className="comm-main" type="flex" justify="center">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
					<List
						header={<div style={{color:"#999"}}>最新日志</div>}
						itemLayout="vertical"
						dataSource={mylist}
						renderItem={item => (
							<List.Item className="list-hover">
								<div className="cssAnimationLeft">
									<div className="list-title">
										<Link to={'/detailed/' + item.id}>{item.title}</Link>
									</div>
									<div className="list-icon">
										<span><CalendarOutlined /> {item.addTime}</span>
										<span><FolderOutlined /> {item.typeName}</span>
										<span><FireOutlined /> {item.view_count}人</span>
									</div>
									<div className="list-context"
										dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
									></div>
								</div>
							</List.Item>
						)}
					/>
					<Pagination defaultCurrent={1} style={{margin:"10 auto",textAlign:"center"}}
						total={total}
						hideOnSinglePage={true}
						current={pageNo}
						pageSize={pageSize}
						onChange={(pageNo, pageSize) => { setPageNo(pageNo); scroll(0,0) }} 
					/>
				</Col>
				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
					<Author />
					<Advert />
				</Col>
			</Row>
			<Footer />
		</div>
	)
}


export default Home
