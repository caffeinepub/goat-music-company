import { Toaster } from "@/components/ui/sonner";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import ActorsPage from "./pages/ActorsPage";
import AdminPage from "./pages/AdminPage";
import ComicsPage from "./pages/ComicsPage";
import HomePage from "./pages/HomePage";
import RecordingsPage from "./pages/RecordingsPage";

// ===== ROUTES =====
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

import { Outlet } from "@tanstack/react-router";

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const recordingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recordings",
  component: RecordingsPage,
});

const comicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/comics",
  component: ComicsPage,
});

const actorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/actors",
  component: ActorsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  recordingsRoute,
  comicsRoute,
  actorsRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.15 0.035 240)",
            border: "1px solid oklch(0.22 0.03 240)",
            color: "oklch(0.95 0.015 210)",
            fontFamily: "Mona Sans, sans-serif",
          },
        }}
      />
    </>
  );
}
