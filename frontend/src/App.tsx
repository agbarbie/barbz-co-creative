import type { ReactNode } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Shop from './pages/Shop';
import Portfolio from './pages/Portfolio';
import CustomOrder from './pages/CustomOrder';
import Booking from './pages/Booking';
import Quote from './pages/Quote';
import Blog from './pages/Blog';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import { AdminAuthProvider } from './admin/AdminAuthContext';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Pages/Dashboard';
import CustomOrdersAdmin from './admin/Pages/CustomOrdersAdmin';
import BookingsAdmin from './admin/Pages/BookingsAdmin';
import QuotesAdmin from './admin/Pages/QuotesAdmin';
import ProductsAdmin from './admin/Pages/ProductsAdmin';
import BlogAdmin from './admin/Pages/BlogAdmin';
import TestimonialsAdmin from './admin/Pages/TestimonialsAdmin';
import MessagesAdmin from './admin/Pages/MessagesAdmin';

function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PublicSite() {
  const location = useLocation();
  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
          <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/custom-order" element={<PageTransition><CustomOrder /></PageTransition>} />
          <Route path="/booking" element={<PageTransition><Booking /></PageTransition>} />
          <Route path="/quote" element={<PageTransition><Quote /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/faqs" element={<PageTransition><FAQs /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* "Backoffice" is the same dashboard as /admin — alias kept for the name it was requested under */}
        <Route path="/backoffice/*" element={<Navigate to="/admin" replace />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout><Dashboard /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/custom-orders"
          element={
            <ProtectedRoute>
              <AdminLayout><CustomOrdersAdmin /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <AdminLayout><BookingsAdmin /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/quotes"
          element={
            <ProtectedRoute>
              <AdminLayout><QuotesAdmin /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminLayout><ProductsAdmin /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute>
              <AdminLayout><BlogAdmin /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <ProtectedRoute>
              <AdminLayout><TestimonialsAdmin /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <AdminLayout><MessagesAdmin /></AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </AdminAuthProvider>
  );
}
