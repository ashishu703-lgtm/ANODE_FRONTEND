export const ROLES = {
  SUPERADMIN: 'superadmin',
  DEPARTMENT_HEAD: 'department_head',
  DEPARTMENT_USER: 'department_user',
};

export const getUserTypeForRole = (role) => {
  switch (role) {
    case ROLES.DEPARTMENT_HEAD:
      return 'salesdepartmenthead';
    case ROLES.DEPARTMENT_USER:
      return 'salesperson';
    case ROLES.SUPERADMIN:
    default:
      return 'superadmin';
  }
};
