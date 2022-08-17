
const path = require('path')
const serverless = require('serverless-http');
const minify = require('html-minifier').minify;

const { app } = require("./dist/blog/serverless/main");

const handle = serverless(app, {
  provider: 'aws',
  type: 'lambda-edge-origin-request'
});

const handler = async (event, context, callback) => {
  const response = await handle(event, context);
  let minified = minify(response.body, {
    caseSensitive: true,
    collapseWhitespace: true,
    preserveLineBreaks: true,
    removeAttributeQuotes: true,
    removeComments: true
  });
  callback(null, {
    status: response.status,
    statusDescription: response.statusDescription,
    headers: {
      ...response.headers,
    },
    body: minified,
    bodyEncoding: response.bodyEncoding
  });

}

exports.handler = handler;
