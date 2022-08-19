
const path = require('path')
const serverless = require('serverless-http');
const minify = require('html-minifier').minify;

const { app } = require("./dist/blog/serverless/main");

const handle = serverless(app, {
  provider: 'aws',
  // type: 'lambda-edge-origin-request'
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
  const callbackBody = {
    status: response.status,
    statusDescription: response.statusDescription,
    headers: {
      ...response.headers,
    },
    body: minified,
    bodyEncoding: response.bodyEncoding
  }
  callback(null, callbackBody);
  console.log(callbackBody)
}

exports.handler = handler;
