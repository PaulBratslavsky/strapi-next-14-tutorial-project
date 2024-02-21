module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/summary',
      handler: 'summaryAi.summary',
    }
  ]
};