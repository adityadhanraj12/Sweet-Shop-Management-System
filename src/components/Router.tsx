import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { WixServicesProvider, rootRouteLoader } from '@/wix-verticals/react-pages/react-router/routes/root';
import { ProductDetailsRoute, productRouteLoader } from '@/wix-verticals/react-pages/react-router/routes/product-details';
import { StoreCollectionRoute, storeCollectionRouteLoader } from '@/wix-verticals/react-pages/react-router/routes/store-collection';
import { defaultStoreCollectionRouteRedirectLoader } from '@/wix-verticals/react-pages/react-router/routes/store-redirect';
import { Cart } from '@/wix-verticals/react-pages/react-router/routes/cart';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import ProfilePage from '@/components/pages/ProfilePage';
import AdminDashboard from '@/components/pages/AdminDashboard';

// Main Layout with Header and Footer
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Wrapper Layout with WixServicesProvider and ScrollToTop
function RootLayout() {
  return (
    <WixServicesProvider>
      <ScrollToTop />
      <MainLayout />
    </WixServicesProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: rootRouteLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute>
            <ProfilePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access the admin dashboard">
            <AdminDashboard />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "store",
        element: (
          <div className="w-full bg-background">
            <div className="max-w-[120rem] mx-auto">
              <StoreCollectionRoute productPageRoute="/products" />
            </div>
          </div>
        ),
        loader: defaultStoreCollectionRouteRedirectLoader,
      },
      {
        path: "store/:categorySlug",
        element: (
          <div className="w-full bg-background">
            <div className="max-w-[120rem] mx-auto">
              <StoreCollectionRoute productPageRoute="/products" />
            </div>
          </div>
        ),
        loader: storeCollectionRouteLoader,
      },
      {
        path: "products/:slug",
        element: (
          <div className="w-full bg-background py-12">
            <div className="max-w-[120rem] mx-auto px-6">
              <ProductDetailsRoute />
            </div>
          </div>
        ),
        loader: productRouteLoader,
      },
      {
        path: "cart",
        element: (
          <div className="w-full bg-background py-12">
            <div className="max-w-[120rem] mx-auto px-6">
              <Cart />
            </div>
          </div>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
