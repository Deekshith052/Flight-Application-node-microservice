const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use('/airlines', createProxyMiddleware({ target: 'http://localhost:3001/airlines', changeOrigin: true }));
app.use('/flights', createProxyMiddleware({ target: 'http://localhost:3002/flights', changeOrigin: true }));
app.use('/passengers', createProxyMiddleware({ target: 'http://localhost:3003/passengers', changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});
