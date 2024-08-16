export const authenticateUser = async (ctx, strapi, orderEmail) => {
  const authorizationHeader = ctx.request.header.authorization;
  if (authorizationHeader) {
    try {
      const token = authorizationHeader.split(" ")[1];
      const decodedToken = await strapi.plugins[
        "users-permissions"
      ].services.jwt.verify(token);
      return decodedToken?.id || null;
    } catch (error) {
      console.error("Error verifying JWT token:", error);
      return null;
    }
  } else {
    try {
      const existingUser = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { email: orderEmail },
        });
      return existingUser?.id || null;
    } catch (error) {
      console.error("Error finding user by email:", error);
      return null;
    }
  }
};
