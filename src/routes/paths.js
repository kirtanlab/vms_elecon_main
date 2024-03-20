// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    manageVisitor: `${ROOTS.DASHBOARD}/manageVisitor`,
    security: `${ROOTS.DASHBOARD}/security`,
    reports:`${ROOTS.DASHBOARD}/reports`,
    dashboardSecurity:`${ROOTS.DASHBOARD}/dashboardSecurity`,
  },
};
