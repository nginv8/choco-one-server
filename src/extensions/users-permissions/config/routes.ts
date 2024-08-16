const routes = [
  {
    method: 'PUT',
    path: '/users/me',
    handler: 'user.updateMe',
    config: {
      prefix: '',
    },
  },
  {
    method: 'DELETE',
    path: '/users/me',
    handler: 'user.deleteMe',
    config: {
      prefix: '',
    },
  },
];

export default routes;
