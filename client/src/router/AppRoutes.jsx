import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { ProductsPage } from '../pages/ProductsPage'
import { ProductDetailPage } from '../pages/ProductDetailPage'
import { BagPage } from '../pages/BagPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage'
import { OrdersPage } from '../pages/OrdersPage'
import { OrderDetailPage } from '../pages/OrderDetailPage'
import { AccountPage } from '../pages/AccountPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { SellerDashboardPage } from '../pages/SellerDashboardPage'
import { SellerProductsPage } from '../pages/SellerProductsPage'
import { SellerNewProductPage } from '../pages/SellerNewProductPage'
import { SellerEditProductPage } from '../pages/SellerEditProductPage'
import { SellerInventoryPage } from '../pages/SellerInventoryPage'
import { SellerOrdersPage } from '../pages/SellerOrdersPage'
import { SellerOrderDetailPage } from '../pages/SellerOrderDetailPage'
import { SellerSettingsPage } from '../pages/SellerSettingsPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProtectedRoute } from './ProtectedRoute'
import { SellerRoute } from './SellerRoute'

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Storefront */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/bag" element={<BagPage />} />

      {/* Auth */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      {/* Buyer Protected: Checkout & Orders */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/:id/confirmation"
        element={
          <ProtectedRoute>
            <OrderConfirmationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/orders/:id"
        element={
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        }
      />

      {/* Seller Portal */}
      <Route
        path="/seller"
        element={
          <SellerRoute>
            <SellerDashboardPage />
          </SellerRoute>
        }
      />
      <Route
        path="/seller/products"
        element={
          <SellerRoute>
            <SellerProductsPage />
          </SellerRoute>
        }
      />
      <Route
        path="/seller/products/new"
        element={
          <SellerRoute>
            <SellerNewProductPage />
          </SellerRoute>
        }
      />
      <Route
        path="/seller/products/edit/:id"
        element={
          <SellerRoute>
            <SellerEditProductPage />
          </SellerRoute>
        }
      />
      <Route
        path="/seller/products/:id/edit"
        element={
          <SellerRoute>
            <SellerEditProductPage />
          </SellerRoute>
        }
      />
      <Route
        path="/seller/inventory"
        element={
          <SellerRoute>
            <SellerInventoryPage />
          </SellerRoute>
        }
      />
      <Route
        path="/seller/orders"
        element={
          <SellerRoute>
            <SellerOrdersPage />
          </SellerRoute>
        }
      />
      <Route
        path="/seller/orders/:id"
        element={
          <SellerRoute>
            <SellerOrderDetailPage />
          </SellerRoute>
        }
      />
      <Route
        path="/seller/settings"
        element={
          <SellerRoute>
            <SellerSettingsPage />
          </SellerRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

