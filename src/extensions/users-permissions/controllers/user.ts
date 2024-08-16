import { Context } from 'koa';
import _ from 'lodash';
import bcrypt from 'bcryptjs';

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const updateMe = async (ctx: Context) => {
  const user = ctx.state.user;

  if (!user || !user.id) {
    return ctx.badRequest('User not found');
  }

  const { currentPassword, ...newData } = _.pick(ctx.request.body, [
    'name',
    'email',
    'phone',
    'address',
    'currentPassword',
  ]);

  if (!currentPassword) {
    return ctx.badRequest('Current password is required');
  }

  if (!newData?.email) {
    return ctx.badRequest('Email is required');
  }

  if (newData.email !== user.email) {
    return ctx.badRequest('Invalid email');
  }

  const validPassword = await bcrypt.compare(currentPassword, user.password);
  if (!validPassword) {
    return ctx.badRequest('Invalid current password');
  }

  const updateFields = _.omit(newData, ['currentPassword']);
  if (Object.keys(updateFields).length === 0) {
    return ctx.badRequest('At least one field to update is required');
  }

  if (newData.name && typeof newData.name !== 'string') {
    return ctx.badRequest('Invalid name format');
  }

  if (newData.email && typeof newData.email !== 'string') {
    return ctx.badRequest('Invalid email format');
  }

  if (newData.phone && typeof newData.phone !== 'string' && !newData.phone.match(phoneRegex)) {
    return ctx.badRequest('Invalid phone format');
  }

  if (newData.address && typeof newData.address !== 'string') {
    return ctx.badRequest('Invalid address format');
  }

  try {
    const updatedUser = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
      data: newData,
    });

    const sanitizedUser = {
      id: updatedUser.id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      email: updatedUser.email,
      address: updatedUser.address,
    };

    return ctx.send(sanitizedUser);
  } catch (error) {
    return ctx.internalServerError(`An error occurred while updating the user ${error}`);
  }
};

export const deleteMe = async (ctx: Context) => {
  const user = ctx.state.user;

  if (!user || !user.id) {
    return ctx.badRequest('User not found');
  }

  try {
    await strapi.entityService.delete('plugin::users-permissions.user', user.id);
    return ctx.send({ message: 'User deleted successfully' });
  } catch (error) {
    return ctx.internalServerError(`An error occurred while deleting the user: ${error}`);
  }
};
