'use strict';

const Controller = require('egg').Controller

class MainController extends Controller {
    async index() {
        this.ctx.body = "api hi"
    }

    async checkLogin() {
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        const sql = 'select userName from admin_user where userName ="' + userName + '" and password = "' + password + '"';
        console.log(sql)
        const res = await this.app.mysql.query(sql);
        if (res.length > 0) {
            let openId = new Date().getTime();
            this.ctx.session = { 'openId': openId }
            this.ctx.body = { 'data': '登陆成功', 'openId': openId }
        } else {
            this.ctx.body = { 'data': '登陆失败' }
        }
    }

    async getTypeInfo() {
        const res = await this.app.mysql.select("type");
        this.ctx.body = { data: res }
    }

    async addArticle() {
        let tmpArticle = this.ctx.request.body;
        const res = await this.app.mysql.insert("article", tmpArticle);
        const insertSuccess = res.affectedRows === 1;
        const id = res.insertId;
        this.ctx.body = {
            isSuccess : insertSuccess,
            id
        }
    }

    async updateArticle() {
        let tmpArticle = this.ctx.request.body;
        const res = await this.app.mysql.update("article", tmpArticle);
        const updateSuccess = res.affectedRows === 1;
        this.ctx.body = {
            isSuccess: updateSuccess,
        }
    }

    //获得文章列表
    async getArticleList() {

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.view_count as view_count,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'ORDER BY article.id DESC '

        const resList = await this.app.mysql.query(sql)
        this.ctx.body = { list: resList }

    }

    //删除文章
    async delArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', { 'id': id })
        this.ctx.body = { data: res }
    }


    //根据文章ID得到文章详情，用于修改文章
    async getArticleById() {
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            'article.view_count as view_count,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'type.typeName as typeName, ' +
            'type.id as typeid ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id ' +
            'WHERE article.id=' + id

        const result = await this.app.mysql.query(sql);
        this.ctx.body = { data: result }
    }
}

module.exports = MainController

