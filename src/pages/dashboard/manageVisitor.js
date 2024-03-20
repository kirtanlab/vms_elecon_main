import { Helmet } from 'react-helmet-async';
// sections
import ManageVisitor from 'src/sections/manageVisitor/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Two</title>
      </Helmet>

      <ManageVisitor />
    </>
  );
}
