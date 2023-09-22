const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://anime-back.francecentral.azurecontainer.io',
            changeOrigin: true,
        })
    );
};