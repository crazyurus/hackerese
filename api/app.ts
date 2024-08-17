import Koa, { Context } from 'koa';
import body from 'koa-body';
import logger from 'koa-logger';

const app = new Koa();

app.use(async (ctx: Context, next) => {
  console.info(`access url: ${ctx.url}`);
  await next();
});

app.use(body());
app.use(logger());

export default app;
