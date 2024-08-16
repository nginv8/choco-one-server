import { updateMe, deleteMe } from './controllers/user';
import routes from './config/routes';

export default (plugin) => {
  plugin.controllers.user.updateMe = updateMe;
  plugin.controllers.user.deleteMe = deleteMe;

  plugin.routes['content-api'].routes = routes.concat(plugin.routes['content-api'].routes);

  return plugin;
};
