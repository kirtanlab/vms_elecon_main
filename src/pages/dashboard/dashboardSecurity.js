import { Helmet } from 'react-helmet-async';
// sections
import DashboardSecurity from 'src/sections/dashboard_security/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Dashboard_security</title>
      </Helmet>

      <DashboardSecurity />
    </>
  );
}
