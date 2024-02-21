'use strict';

module.exports = ({ strapi }) => ({
  async summary(ctx) {
    ctx.body = await strapi
      .plugin('summary-ai')
      .service('summaryAi')
      .summary(ctx);
  },
});
