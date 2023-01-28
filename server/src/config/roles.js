const allRoles = {
  user: ['getPassword', 'managePassword'],
  admin: ['getUsers', 'manageUsers', 'getPassword', 'managePassword'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
