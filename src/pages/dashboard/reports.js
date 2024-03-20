import { Helmet } from 'react-helmet-async';
// sections
import Reports from 'src/sections/reports/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Reports</title>
      </Helmet>

      <Reports />
    </>
  );
}
