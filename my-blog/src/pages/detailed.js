import React, { useState, useEffect } from "react";
import { Row, Col, Breadcrumb, Affix } from "antd";
import { CalendarOutlined, FolderOutlined, FireOutlined } from "@ant-design/icons"
import Header from '../components/Header';
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import '../style/pages/detailed.css';
import axios from 'axios';
import Tocify from "../components/tocify.tsx"

import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css"
import servicePath from '../config/apiUrl'
const Detailed = (props) => {
	const [typeName, setTypeName] = useState()
	const [addTime, setAddTime] = useState()
	const [count, setCount] = useState()
	const [title,setTitle] = useState()
	const [article_content, setArticleContent] = useState();
	const [nav,setNav] = useState();

	const getArticleById = ()=>{
		axios(servicePath.getArticleById + props.match.params.id).then(
			(res) => {
				setArticleContent(marked(res.data.data[0].article_content))
				setTypeName(res.data.data[0].typeName)
				setCount(res.data.data[0].view_count)
				setAddTime(res.data.data[0].addTime)
				setTitle(res.data.data[0].title)
				setNav(tocify && tocify.render())
			}
		)
	}
	useEffect(()=>{
		getArticleById();
	},[])

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

	const tocify = new Tocify();
	renderer.heading = (text, level, row) => {
		const anchor = tocify.add(text, level);
		return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>`
	}

	return (
		<div>
			<Header></Header>
			<Row className="comm-main" type="flex" justify="center">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
					<div>
						<div className="bread-div">
							<Breadcrumb>
								<Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
								<Breadcrumb.Item><a href={"/list/" + typeName}>{typeName}</a></Breadcrumb.Item>
								<Breadcrumb.Item>{title}</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<div className="detailed-title">
								{title}
							</div>

							<div className="list-icon center">
								<span><CalendarOutlined /> {addTime}</span>
								<span><FolderOutlined /> {typeName}</span>
								<span><FireOutlined /> {count}人</span>
							</div>

							<div className="detailed-content"
								dangerouslySetInnerHTML={{ __html: article_content }}
							>
							</div>
						</div>
					</div>
				</Col>
				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={5}>
					<Author />
					<Advert />
					<Affix offsetTop={5}>
						<div className="detailed-nav comm-box">
							<div className="nav-title">文章目录</div>
							{/* {tocify && tocify.render()} */}
							{nav}
						</div>
					</Affix>
				</Col>
			</Row>
			<Footer />
		</div>
	)
}


export default Detailed
