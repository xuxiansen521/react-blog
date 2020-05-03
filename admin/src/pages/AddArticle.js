import React, { useState, useEffect } from "react"
import marked from "marked";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";

const { Option } = Select
const { TextArea } = Input

function AddArticle(props) {

    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    // const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState() //选择的文章类别

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const changeContent = (e) => {
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html);
    }

    const getTypeInfo = () => {
        axios({
            method: "GET",
            url: servicePath.getTypeInfo,
            withCredentials: true
        }).then(res => {
            console.log(res)
            if (res.data.data === "no login") {
                localStorage.removeItem('openId')
                props.history.push('/')
            } else {
                setTypeInfo(res.data.data)
            }
        })
    }

    const selectTypeHandle = value => {
        console.log(value)
        setSelectType(value)
    }

    const saveArticle = () => {
        if (!selectedType) {
            message.error("请选择文章类别");
            return false;
        } else if (!articleTitle) {
            message.error("请输入文章名称");
            return false;
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }
        let data = {};
        data.type_id = selectedType;
        data.title = articleTitle;
        data.article_content = articleContent;
        data.introduce = introducemd;
        data.addTime = new Date(showDate.replace('-', '/')).getTime() / 1000
        if (articleId === 0) {
            axios({
                method: "POST",
                url: servicePath.addArticle,
                data,
                withCredentials: true
            }).then(res => {
                if (res.data.isSuccess) {
                    message.success("发布成功");
                    setArticleId(res.data.id)
                } else {
                    message.error('文章保存失败');
                }
            })
        } else {
            data.id = articleId;
            axios({
                method: "POST",
                url: servicePath.updateArticle,
                data,
                withCredentials: true
            }).then(res => {
                if (res.data.isSuccess) {
                    message.success("修改成功");
                } else {
                    message.error('修改成功');
                }
            })
        }

    }

    const getArticleById = (id)=>{
        axios(servicePath.getArticleById+id,{
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(res=>{
            console.log(res)
            const info = res.data.data[0];
            if(info){
                setArticleTitle(info.title)
                setArticleContent(info.article_content)
                let content_html = marked(info.article_content)
                setMarkdownContent(content_html)
                setIntroducemd(info.introduce)
                let introduce_html = marked(info.introduce)
                setIntroducehtml(introduce_html)
                setShowDate(info.addTime)
                setSelectType(info.typeid)
            }else{
                props.history.push('/index/list/')

            }
        })
    }

    useEffect(() => {
        getTypeInfo();
        let temp = props.match.params.id;
        if(temp){
            setArticleId(temp)
            getArticleById(temp)
        }
    }, [])

    return (
        <div>
            <Row gutter={10}>
                <Col span={18}>
                    <Row gutter={10} className="add-input">
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                onChange={(e) => (setArticleTitle(e.target.value))}
                                placeholder="博客标题"
                                size="large"
                            />
                        </Col>
                        <Col span={4}>
                            <Select placeholder="请选择类型" value={selectedType} size="large" onChange={selectTypeHandle}>
                                {
                                    typeInfo.map((item, index) => {
                                        return <Option key={index} value={item.id} >{item.typeName}</Option>
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>

                    <Row gutter={10} className="article-content">
                        <Col span={12}>
                            <TextArea className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                value={articleContent}
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className='show-html'
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                            ></div>
                        </Col>
                    </Row>


                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24} className="mb15">
                            <Button size="large" className="article-button" >暂存文章</Button>
                            <Button type="primary" size="large" className="article-button" onClick={saveArticle}>
                                {articleId === 0 ? '发布文章' : '修改文章'}
                            </Button>
                        </Col>
                        <Col span={24}>
                            <TextArea className="mb15"
                                rows={4}
                                value={introducemd}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                            />
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: introducehtml }}
                            >
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(data, dataString) => (setShowDate(dataString))}
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="修改日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle