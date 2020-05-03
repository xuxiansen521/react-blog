module.exports = option => {

    return async (ctx, next) => {
        if(ctx.session.openId){
            await next();
        }else{
            ctx.body = {data:"no login"}
        }
    }
}