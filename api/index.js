require('dotenv').config();
const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const sqlUtils = require('./sql');

const router = new Router();
router.get('/', async(ctx, next) => {
    ctx.status = 200;

    await next();
});
router.get('/users/:id', async(ctx, next) => {
    let params = ctx.request.params;

    const rsp = await sqlUtils.queryById(params.id);
    ctx.status = 200;
    ctx.body = JSON.stringify(rsp);

    await next();
});
router.post('/users', async(ctx, next) => {
    let query = ctx.request.query;

    const rsp = await sqlUtils.create(query.name, query.age, query.salary);
    ctx.status = 200;
    ctx.body = JSON.stringify(rsp);

    await next();
});
router.get('/users', async(ctx, next) => {
    let query = ctx.request.query;

    let rsp;
    switch (query.type) {
        case "by_name":
            rsp = await sqlUtils.queryByName(query.name);
            break;
        case "by_salary":
            rsp = await sqlUtils.queryBySalaryRange(query.from, query.to);
            break;
        default:
            rsp = {};
    }
    
    ctx.status = 200;
    ctx.body = JSON.stringify(rsp);

    await next();
});

const app = new Koa();
app.use(bodyParser());
app.use(json({
    pretty: true
}));
app.use(router.routes());
app.use(router.allowedMethods());

const host = process.env.HOST;
const port = process.env.PORT;
app.listen({host: host, port: port});
console.log(`Server was started, see http://${host}:${port}`);

