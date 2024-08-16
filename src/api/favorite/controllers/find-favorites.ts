export async function findFavorites(ctx, strapi) {
  const { user } = ctx.state;

  try {
    let favorite = await strapi.entityService.findMany(
      "api::favorite.favorite",
      {
        filters: { user: user.id },
        populate: {
          products: true,
        },
      }
    );

    if (!favorite || favorite.length === 0) {
      favorite = await strapi.entityService.create("api::favorite.favorite", {
        data: {
          user: user.id,
          products: [],
        },
      });
    } else {
      favorite = favorite[0];
    }

    const productIds = favorite.products.map((product: any) => product.id);

    ctx.send({data: productIds});
  } catch (error) {
    ctx.internalServerError(
      "An error occurred while retrieving favorite products."
    );
  }
}
