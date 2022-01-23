const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('koa-router')();
const fetch = require('node-fetch');

function mapSeverityToColor(severity) {
  switch (severity) {
    case 'debug':
    case 'notice':
    case 'info':
      return 7585641;

    case 'warning':
      return 16750640;

    case 'err':
    case 'error':
    case 'crit':
    case 'alert':
    case 'emerg':
    case 'panic':
      return 15885897;
  }
}

const app = new Koa();
app.use(koaBody());

router.post('/relay', async (ctx) => {
  await Promise.all(
    body.metrics.map(async (metric) =>
      fetch(
        'https://discord.com/api/webhooks/934671053807042630/HlluosmOoUFxA596O0tVPDJFQRdukSEuXNgTCrRWQuFSLFL6-iJsd1C24bWangWTzcMq',
        {
          method: 'post',
          body: JSON.stringify({
            content: null,
            embeds: [
              {
                title: `${metric.tags.severity}`,
                description: `${metric.fields.message}`,
                url: 'https://nas.stouder.io',
                color: mapSeverityToColor(metric.tags.severity),
              },
            ],
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      )
    )
  );

  ctx.status = 200;
  ctx.body = 'Ok';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3340, '0.0.0.0', () => {
  console.log('Up and running !');
});
