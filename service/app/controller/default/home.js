'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = "api hi"
    }

    async getArticleList() {
        let sql = 'select article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %h:%i:%s') as addTime," +
            'article.view_count as view_count,' +
            'type.typeName as typeName ' +
            'from article left join type on article.type_id = type.id';
        const results = await this.app.mysql.query(sql);
        this.ctx.body = { data: results }
    }

    async getArticleById() {
        //TODO 待优化
        let id = this.ctx.params.id;
        const count_sql = "select view_count from article where id=" + id;
        const count = await this.app.mysql.query(count_sql);
        const new_count = count[0].view_count + 1
        const upd_sql = "update article set view_count=" + new_count+ " where id=" + id
        await this.app.mysql.query(upd_sql);
        let sql = 'select article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %h:%i:%s') as addTime," +
            'article.view_count as view_count,' +
            'type.id as typeid, ' +
            'type.typeName as typeName ' +
            'from article left join type on article.type_id = type.id ' +
            'where article.id=' + id;

        const result = await this.app.mysql.query(sql);
        console.log(result)
        this.ctx.body = { data: result }
    }

    async getTypeInfo() {
        const results = await this.app.mysql.select("type");
        this.ctx.body = { data: results }
    }

    async getListById() {
        let id = this.ctx.params.id;
        let sql = 'select article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %h:%i:%s') as addTime," +
            'article.view_count as view_count,' +
            'type.typeName as typeName ' +
            'from article left join type on article.type_id = type.id ' +
            'where type.id=' + id
        const results = await this.app.mysql.query(sql);
        this.ctx.body = { data: results }
    }

    async changeCount(){
        let data = this.ctx.request.body;

        let sql = "update article set view_count="+data.view_count +" where id=" + data.id
        const results = await this.app.mysql.query(sql);
        this.ctx.body = { data: results }
    }
}

module.exports = HomeController;
