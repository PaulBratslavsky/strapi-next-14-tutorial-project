"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    strapi.log.info("In is-note-owner middleware.");
    const entryId = ctx.params.id;
    const user = ctx.state.user;
    const userId = user?.id;

    if (!userId) return ctx.unauthorized(`You can't access this entry`);

    ctx.query = {
      ...ctx.query,
      filters: { ...ctx.query.filters, user: userId },
    };

    console.log("ctx.query", ctx.query);

    console.log("ctx.query", ctx.query);

    await next();
  };
};
