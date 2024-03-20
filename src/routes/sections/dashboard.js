import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------
 
const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const ManageVisitor = lazy(() => import('src/pages/dashboard/manageVisitor'));
const Security = lazy(() => import('src/pages/dashboard/security'));
const Reports = lazy(() => import('src/pages/dashboard/reports'));
const DashboardSecurity = lazy(() => import('src/pages/dashboard/dashboardSecurity'));
// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'manageVisitor', element: <ManageVisitor /> },
      { path: 'security', element: <Security /> },
      { path: 'reports', element: <Reports /> },
      { path: 'dashboardSecurity', element: <DashboardSecurity /> },
    ],
  },
];
