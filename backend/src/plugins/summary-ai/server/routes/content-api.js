module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/summary/:videoId',
      handler: 'summaryAi.summary',
      config: {
        middlewares: ["plugin::summary-ai.isUserAuthenticated"],
      }
    }
  ]
};