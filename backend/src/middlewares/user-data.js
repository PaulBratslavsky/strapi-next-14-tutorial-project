"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const userId = ctx.params.id;
    const authUser = ctx.state.user;

    if (authUser !==  userId)
      return ctx.unauthorized(`You are not authorized to perform this action.`);

    await next();
  };
};
