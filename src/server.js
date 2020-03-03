import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// source code
// polka() // You can also use Express
// 	.use(
// 		compression({ threshold: 0 }),
// 		sirv('static', { dev }),
// 		sapper.middleware()
// 	)
// 	.listen(PORT, err => {
// 		if (err) console.log('error', err);
// 	});


// 插入中间件
const { createProxyMiddleware } = require('http-proxy-middleware');
import proxyArray from '../proxy.config';

const app = polka() // You can also use Express

// 启动代理
createProxy();

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
).listen(PORT, err => {
	if (err) console.log('error', err);
});



function createProxy() {
	for (let i = 0; i < proxyArray.length; i++) {
		app.use(createProxyMiddleware(proxyArray[i].path, { target: proxyArray[i].target, changeOrigin: true }));
	}
}