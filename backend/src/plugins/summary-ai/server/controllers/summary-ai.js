'use strict';

module.exports = ({ strapi }) => ({
  async summary(ctx) {
    console.log('summary-ai controller');
    ctx.body = await strapi
      .plugin('summary-ai')
      .service('summaryAi')
      .summary(ctx);
  },
});
