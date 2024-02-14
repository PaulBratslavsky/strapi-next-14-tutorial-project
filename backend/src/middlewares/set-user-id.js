"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const userId = user?.id;

    if (!userId)
      return ctx.unauthorized(`You are not authorized to perform this action.`);

    ctx.request.body.data.user = userId;
    await next();
  };
};
