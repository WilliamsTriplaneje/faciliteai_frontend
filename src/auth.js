export const isAuthenticated = () => {
  const providerId = localStorage.getItem("providerId");
  const adminId = localStorage.getItem('AdminId')
  if (!providerId && !adminId) {
    return false;
  }
  return true;
};
