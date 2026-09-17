import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSellerProducts } from '../features/products/hooks/useSellerProducts'
import { useOrders } from '../features/orders/hooks/useOrders'
import { SellerNav } from '../components/SellerNav'
import {
  Package,
  Eye,
  EyeOff,
  AlertTriangle,
  Archive,
  Plus,
  ArrowRight,
  ClipboardList,
  ShoppingBag,
} from 'lucide-react'

export const SellerDashboardPage = () => {
  const {
    sellerProducts,
    isLoading: isProductsLoading,
    error: productsError,
    loadSellerProducts,
  } = useSellerProducts()

  const {
    orders,
    isLoading: isOrdersLoading,
    error: ordersError,
    loadOrders,
  } = useOrders()

  useEffect(() => {
    loadSellerProducts(1)
    loadOrders()
  }, [loadSellerProducts, loadOrders])

  // Compute real metrics from loaded seller data (NO fake stats)
  const totalProducts = sellerProducts.length
  const publishedCount = sellerProducts.filter((p) => p.isPublished).length
  const draftCount = sellerProducts.filter((p) => !p.isPublished).length
  const totalUnits = sellerProducts.reduce(
    (acc, p) => acc + (p.sizes?.reduce((sAcc, s) => sAcc + (s.stock || 0), 0) || 0),
    0
  )
  const lowStockCount = sellerProducts.filter((p) =>
    p.sizes?.some((s) => s.stock > 0 && s.stock <= 5)
  ).length
  const outOfStockCount = sellerProducts.filter(
    (p) => p.sizes && p.sizes.every((s) => s.stock === 0)
  ).length

  return (
    <div>
      <SellerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Banner Header */}
        <div className="border-b border-hairline pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink font-normal">
              Atelier Overview
            </h1>
            <p className="text-xs text-ink-muted mt-1">
              Real-time catalog metrics and inventory tracking from your live database.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/seller/products/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-canvas text-xs uppercase tracking-eyebrow font-medium hover:bg-ink/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Garment
            </Link>
          </div>
        </div>

        {(productsError || ordersError) && (
          <div className="mb-6 p-4 bg-critical/10 border border-critical text-critical text-xs">
            {productsError || ordersError}
          </div>
        )}

        {/* Real Data KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {/* Total Garments */}
          <div className="bg-surface border border-hairline p-5">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-[11px] uppercase tracking-eyebrow">Catalog</span>
              <Package className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div className="font-serif text-3xl text-ink font-normal">{totalProducts}</div>
            <span className="text-[10px] text-ink-muted uppercase tracking-eyebrow mt-1 block">
              Total Garments
            </span>
          </div>

          {/* Published */}
          <div className="bg-surface border border-hairline p-5">
            <div className="flex items-center justify-between text-positive mb-2">
              <span className="text-[11px] uppercase tracking-eyebrow text-ink-muted">Active</span>
              <Eye className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div className="font-serif text-3xl text-positive font-normal">{publishedCount}</div>
            <span className="text-[10px] text-ink-muted uppercase tracking-eyebrow mt-1 block">
              Published Live
            </span>
          </div>

          {/* Drafts */}
          <div className="bg-surface border border-hairline p-5">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-[11px] uppercase tracking-eyebrow">Drafts</span>
              <EyeOff className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div className="font-serif text-3xl text-ink font-normal">{draftCount}</div>
            <span className="text-[10px] text-ink-muted uppercase tracking-eyebrow mt-1 block">
              Unpublished
            </span>
          </div>

          {/* Total Units */}
          <div className="bg-surface border border-hairline p-5">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-[11px] uppercase tracking-eyebrow">Stock</span>
              <Archive className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div className="font-serif text-3xl text-ink font-normal">{totalUnits}</div>
            <span className="text-[10px] text-ink-muted uppercase tracking-eyebrow mt-1 block">
              Units In Stock
            </span>
          </div>

          {/* Low Stock */}
          <div className="bg-surface border border-hairline p-5">
            <div className="flex items-center justify-between text-accent mb-2">
              <span className="text-[11px] uppercase tracking-eyebrow text-ink-muted">Attention</span>
              <AlertTriangle className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div className="font-serif text-3xl text-accent font-normal">{lowStockCount}</div>
            <span className="text-[10px] text-ink-muted uppercase tracking-eyebrow mt-1 block">
              Low Stock (≤5)
            </span>
          </div>

          {/* Store Orders */}
          <div className="bg-surface border border-hairline p-5">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-[11px] uppercase tracking-eyebrow">Orders</span>
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div className="font-serif text-3xl text-ink font-normal">{orders.length}</div>
            <span className="text-[10px] text-ink-muted uppercase tracking-eyebrow mt-1 block">
              Recorded Orders
            </span>
          </div>
        </div>

        {/* Quick Action Navigation Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/seller/products"
            className="group block p-6 bg-surface border border-hairline hover:border-ink transition-all"
          >
            <div className="flex justify-between items-start">
              <Package className="w-6 h-6 text-ink stroke-[1.5]" />
              <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-ink group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-serif text-xl text-ink mt-4 mb-1">Catalog Listings</h3>
            <p className="text-xs text-ink-muted">
              Publish or unpublish garments, modify descriptions, and update photo assets.
            </p>
          </Link>

          <Link
            to="/seller/inventory"
            className="group block p-6 bg-surface border border-hairline hover:border-ink transition-all"
          >
            <div className="flex justify-between items-start">
              <ClipboardList className="w-6 h-6 text-ink stroke-[1.5]" />
              <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-ink group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-serif text-xl text-ink mt-4 mb-1">Inventory Matrix</h3>
            <p className="text-xs text-ink-muted">
              Inspect size-by-size inventory (XS–XXL) and track low stock thresholds.
            </p>
          </Link>

          <Link
            to="/seller/orders"
            className="group block p-6 bg-surface border border-hairline hover:border-ink transition-all"
          >
            <div className="flex justify-between items-start">
              <ShoppingBag className="w-6 h-6 text-ink stroke-[1.5]" />
              <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-ink group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-serif text-xl text-ink mt-4 mb-1">Store Orders</h3>
            <p className="text-xs text-ink-muted">
              Process customer shipments and transition order statuses with live audit notes.
            </p>
          </Link>
        </div>

        {/* Recent Seller Products Preview */}
        <div className="border border-hairline bg-surface p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6">
            <div>
              <h2 className="font-serif text-2xl text-ink">Recent Garment Listings</h2>
              <p className="text-xs text-ink-muted mt-1">
                Latest creations synced with your merchant inventory.
              </p>
            </div>
            <Link
              to="/seller/products"
              className="text-xs uppercase tracking-eyebrow text-ink underline underline-offset-4 hover:text-accent transition-colors"
            >
              View Complete Catalog
            </Link>
          </div>

          {isProductsLoading ? (
            <div className="py-12 text-center">
              <span className="inline-block animate-spin border-2 border-ink border-t-transparent rounded-full w-6 h-6" />
              <p className="text-xs uppercase tracking-eyebrow text-ink-muted mt-3">
                Loading listings...
              </p>
            </div>
          ) : sellerProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xs text-ink-muted mb-4 uppercase tracking-eyebrow">
                No garments in your atelier catalog yet.
              </p>
              <Link
                to="/seller/products/new"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-ink text-canvas text-xs uppercase tracking-eyebrow font-medium"
              >
                <Plus className="w-4 h-4" />
                Add First Garment
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-hairline">
              {sellerProducts.slice(0, 5).map((p) => {
                const id = p._id || p.id
                const stock = p.sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || 0
                return (
                  <div key={id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images?.[0]?.url || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'}
                        alt={p.title}
                        className="w-10 h-12 object-cover bg-canvas border border-hairline"
                      />
                      <div>
                        <Link
                          to={`/seller/products/edit/${id}`}
                          className="font-medium text-sm text-ink hover:text-accent transition-colors block line-clamp-1"
                        >
                          {p.title}
                        </Link>
                        <span className="text-xs text-ink-muted">
                          {p.categories?.join(', ')} · Total Stock: {stock}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-2.5 py-0.5 text-[10px] uppercase tracking-eyebrow font-medium border ${
                          p.isPublished
                            ? 'bg-positive/10 text-positive border-positive/30'
                            : 'bg-sand/30 text-ink-muted border-hairline'
                        }`}
                      >
                        {p.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <Link
                        to={`/seller/products/edit/${id}`}
                        className="text-xs uppercase tracking-eyebrow text-ink underline underline-offset-4 hover:text-accent"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

