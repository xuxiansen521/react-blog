'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = "api hi"
    }

    async getArticleList() {
        let pageNo = this.ctx.query.pageNo;
        let pageSize = this.ctx.query.pageSize
        let sql = 'select article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime," +
            'article.view_count as view_count,' +
            'type.typeName as typeName ' +
            'from article left join type on article.type_id = type.id ' +
            'order by article.addTime DESC '
        if (pageNo) {
            sql = sql + 'limit ' + (pageNo - 1) * pageSize + "," + pageSize
        }
        console.log("==========", sql)
        const results = await this.app.mysql.query(sql);
        const total = await this.app.mysql.query("select count(*) as total from article")
        this.ctx.body = { data: results, total: total[0].total }
    }

    async getArticleById() {
        //TODO 待优化
        let id = this.ctx.params.id;
        const count_sql = "select view_count from article where id=" + id;
        const count = await this.app.mysql.query(count_sql);
        const new_count = count[0].view_count + 1
        const upd_sql = "update article set view_count=" + new_count + " where id=" + id
        await this.app.mysql.query(upd_sql);
        let sql = 'select article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime," +
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
        let typeName = this.ctx.params.id;
        let pageNo = this.ctx.query.pageNo;
        let pageSize = this.ctx.query.pageSize
        let sql = 'select article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime," +
            'article.view_count as view_count,' +
            'type.typeName as typeName ' +
            'from article left join type on article.type_id = type.id ' +
            'where type.typeName=' + '"' + typeName + '"' +
            'order by article.addTime DESC ';
        if (pageNo) {
            sql = sql + 'limit ' + (pageNo - 1) * pageSize + "," + pageSize
        }
        const results = await this.app.mysql.query(sql);
        const total = await this.app.mysql.query("select count(*) as total from article left join type on article.type_id = type.id where type.typeName=" + '"'+ typeName+'"'  )
        this.ctx.body = { data: results, total: total[0].total }
    }

    async changeCount() {
        let data = this.ctx.request.body;

        let sql = "update article set view_count=" + data.view_count + " where id=" + data.id
        const results = await this.app.mysql.query(sql);
        this.ctx.body = { data: results }
    }
}

module.exports = HomeController;
