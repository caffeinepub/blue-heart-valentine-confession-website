import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import AppLayout from './components/AppLayout';
import ProposalPage from './pages/ProposalPage';
import TransitionPage from './pages/TransitionPage';
import GiftsHubPage from './pages/GiftsHubPage';
import LoveQuizPage from './pages/LoveQuizPage';
import LoveLetterPage from './pages/LoveLetterPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import ForeverPage from './pages/ForeverPage';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ProposalPage,
});

const yayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/yay',
  component: TransitionPage,
});

const giftsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gifts',
  component: GiftsHubPage,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gifts/quiz',
  component: LoveQuizPage,
});

const letterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gifts/letter',
  component: LoveLetterPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gifts/gallery',
  component: PhotoGalleryPage,
});

const foreverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forever',
  component: ForeverPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  yayRoute,
  giftsRoute,
  quizRoute,
  letterRoute,
  galleryRoute,
  foreverRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
