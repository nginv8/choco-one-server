import { factories } from '@strapi/strapi';
import { updateFavorites } from './update-favorites';
import { findFavorites } from './find-favorites';

export default factories.createCoreController('api::favorite.favorite', ({ strapi }) => ({
  async update(ctx) {
    return await updateFavorites(ctx, strapi);
  },

  async create(ctx) {
    return await updateFavorites(ctx, strapi);
  },

  async find(ctx) {
    return await findFavorites(ctx, strapi);
  },

}));
