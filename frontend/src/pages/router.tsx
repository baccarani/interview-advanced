import { createBrowserRouter } from 'react-router-dom'
import NotFound from './not-found/NotFoundPage'
import ErrorBoundary from './error-boundary/ErrorBoundary'
import HomePage from './home/HomePage'
import InterviewPage from './interview/InterviewPage'
import DashboardPage from './dashboard/DashboardPage'
import PreparePage from './prepare/PreparePage'
import { Protected } from './protectedRoute'
import AccountPage from './account/AccountPage'
import { PersistLogin } from '@/features/auth/persistantLogin'
import { RoleCheckGuard, RouteGuard } from './RouterGuard'
import { Feedback } from './feedback/Feedback'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PersistLogin />,
    children: [
      { path: '/', element: <HomePage />, errorElement: <ErrorBoundary /> },
      {
        path: '/',
        element: <RoleCheckGuard />,
        children: [
          {
            path: '/interview/prepare',
            element: <PreparePage />,
            errorElement: <ErrorBoundary />,
          },
        ],
        errorElement: <ErrorBoundary />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },

  {
    path: '/',
    element: <PersistLogin />,
    children: [
      {
        path: '/',
        element: <Protected />,
        children: [
          {
            path: '/',
            element: <HomePage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/account',
            element: <AccountPage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/interviews/:id/result',
            element: <Feedback />,
            errorElement: <ErrorBoundary />,
          },
        ],
        errorElement: <ErrorBoundary />,
      },
    ],
  },

  {
    path: '/',
    element: <RouteGuard />,
    children: [
      {
        path: '/interview/:interview_id',
        element: <InterviewPage />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
    errorElement: <ErrorBoundary />,
  },
])
