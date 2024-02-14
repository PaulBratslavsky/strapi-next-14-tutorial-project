'use strict';

/**
 * video router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::video.video', {
  config: {
    find: {
      middlewares: ["api::video.is-video-owner"],
    },
    findOne: {
      middlewares: ["api::video.is-video-owner"],
    },
  },
});
