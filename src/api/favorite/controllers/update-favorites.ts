export async function updateFavorites(ctx, strapi) {
  const { user } = ctx.state;
  const { data: productIds } = ctx.request.body;

  if (!Array.isArray(productIds) || productIds.some(id => typeof id !== 'number')) {
    return ctx.badRequest('Invalid data format. Expected an array of product IDs.');
  }

  if (!user) {
    return ctx.unauthorized('You must be logged in to update favorites.');
  }

  try {
    let favorite = await strapi.entityService.findMany('api::favorite.favorite', {
      filters: { user: user.id },
      populate: { products: true, user: true },
    });

    favorite = Array.isArray(favorite) ? favorite[0] : favorite;

    const productIdsSet = [...new Set(productIds)].map(id => ({ id }));

    if (!favorite) {
      favorite = await strapi.entityService.create('api::favorite.favorite', {
        data: {
          user: user.id,
          products: productIdsSet,
        },
        populate: { products: true},
      });
    } else {
      favorite = await strapi.entityService.update('api::favorite.favorite', favorite.id, {
        data: {
          products: productIdsSet,
        },
        populate: { products: true},
      });
    }

    const products = favorite.products.map(product => product.id);
    ctx.send({ data: products });
  } catch (error) {
    console.error('Error updating favorites:', error);
    ctx.internalServerError('An error occurred while updating favorites.');
  }
}
