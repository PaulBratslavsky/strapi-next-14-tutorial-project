"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized("You are not authenticated");
    const availableCredits = user.credits;

    if (availableCredits === 0)
      return ctx.unauthorized("You do not have enough credits.");

    const uid = "plugin::users-permissions.user";
    const payload = { data: { credits: availableCredits - 1 } };
    const response = await strapi.entityService.update(uid, user.id, payload);

    console.log("Updated credits:", response);
    console.log("############ Inside middleware end #############");

    await next();
  };
};
