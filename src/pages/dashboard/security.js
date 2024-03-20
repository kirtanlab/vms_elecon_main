import { Helmet } from 'react-helmet-async';
// sections
import Security from 'src/sections/security/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Security</title>
      </Helmet>

      <Security />
    </>
  );
}
