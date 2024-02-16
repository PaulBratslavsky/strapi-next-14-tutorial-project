'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const userRoutes = strapi.plugins['users-permissions'].routes["content-api"].routes;
    const usersDataMiddlewares = "global::user-data";

    const findUser = userRoutes.findIndex(
      (route) => route.handler === "user.find" && route.method === "GET"
    )

    const findOneUser = userRoutes.findIndex(
      (route) => route.handler === "user.findOne" && route.method === "GET"
    )

    const updateUser = userRoutes.findIndex(
      (route) => route.handler === "user.update" && route.method === "PUT"
    );

    function initializeRoute(routes, index) {
      routes[index].config.middlewares = routes[index].config.middlewares || [];
      routes[index].config.policies = routes[index].config.policies || [];
    }

    if (updateUser) {
      initializeRoute(userRoutes, findUser);
      userRoutes[findUser].config.middlewares.push(usersDataMiddlewares);
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
