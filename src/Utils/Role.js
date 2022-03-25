export const getAssociationRoleName = (roleList, associationRoleId) => {
  if (roleList && associationRoleId) {
    const role = roleList.find((role) => role.id === associationRoleId);
    if (role) {
      return role.name;
    }
  }
  return null;
};
