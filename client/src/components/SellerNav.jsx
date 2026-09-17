import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, Plus, ClipboardList, ShoppingBag, Settings, Store } from 'lucide-react'

export const SellerNav = () => {
  const location = useLocation()
  const pathname = location.pathname

  const links = [
    { label: 'Dashboard', path: '/seller', icon: LayoutDashboard },
    { label: 'Products', path: '/seller/products', icon: Package },
    { label: 'Add Garment', path: '/seller/products/new', icon: Plus },
    { label: 'Inventory', path: '/seller/inventory', icon: ClipboardList },
    { label: 'Store Orders', path: '/seller/orders', icon: ShoppingBag },
    { label: 'Settings', path: '/seller/settings', icon: Settings },
  ]

  return (
    <div className="border-b border-hairline bg-surface mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-ink text-canvas text-[10px] uppercase tracking-eyebrow font-medium">
              Atelier Portal
            </span>
            <span className="text-xs uppercase tracking-eyebrow text-ink-muted">
              Merchant Admin
            </span>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-eyebrow text-ink-muted hover:text-ink transition-colors"
          >
            <Store className="w-3.5 h-3.5" />
            Switch to Storefront
          </Link>
        </div>

        {/* Sub-Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-3 sm:pb-0 scrollbar-none">
          {links.map((link) => {
            const Icon = link.icon
            const isActive =
              link.path === '/seller'
                ? pathname === '/seller'
                : pathname.startsWith(link.path)

            return (
              <Link
                key={link.label}
                to={link.path}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs uppercase tracking-eyebrow font-medium transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-ink text-ink bg-canvas/40'
                    : 'border-transparent text-ink-muted hover:text-ink hover:border-hairline'
                }`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[1.5]" />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
