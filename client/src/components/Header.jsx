import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggleCartDrawer,
  toggleMobileMenu,
  closeMobileMenu,
} from '../app/uiSlice'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useCart } from '../features/cart/hooks/useCart'
import { useTheme } from '../app/themeContext'
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  Shield,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react'

export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, isSeller, signOut } = useAuth()
  const { itemCount } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const { mobileMenuOpen } = useSelector((state) => state.ui)

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchOpen(false)
    }
  }

  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate('/account')
    } else {
      navigate('/auth/login')
    }
  }

  const navCategories = [
    { label: 'Men', path: '/products?category=Men' },
    { label: 'T-Shirts', path: '/products?category=T-Shirts' },
    { label: 'Shirts', path: '/products?category=Shirts' },
    { label: 'Jeans', path: '/products?category=Jeans' },
    { label: 'Hoodies', path: '/products?category=Hoodies' },
    { label: 'Jackets', path: '/products?category=Jackets' },
    { label: 'Joggers', path: '/products?category=Joggers' },
    { label: 'Shorts', path: '/products?category=Shorts' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-canvas border-b border-hairline">
      {/* Top Banner */}
      <div className="bg-ink text-canvas py-1.5 px-4 text-center text-[10px] uppercase tracking-eyebrow font-medium">
        Complimentary Delivery & 7-Day Boutique Exchanges Across India
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile: Left Hamburger */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="p-2 text-ink hover:text-accent transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
            </button>
          </div>

          {/* Snitch Logo */}
          <div className="flex items-center">
            <Link to="/" className="inline-block group py-2">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight text-ink uppercase">
                Snitch
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-5 lg:space-x-6 mx-4">
            {navCategories.map((cat) => {
              const isActive = location.pathname + location.search === cat.path
              return (
                <Link
                  key={cat.label}
                  to={cat.path}
                  className={`text-[11px] uppercase tracking-eyebrow transition-colors ${
                    isActive
                      ? 'text-ink font-semibold border-b border-ink pb-0.5'
                      : 'text-ink-muted hover:text-ink font-normal'
                  }`}
                >
                  {cat.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions: Search, Account, Bag */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-ink hover:text-accent transition-colors"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </button>

            {/* Seller Portal Link if Seller */}
            {isSeller && (
              <Link
                to="/seller"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-hairline text-ink hover:border-ink text-[11px] uppercase tracking-eyebrow font-medium transition-colors"
              >
                <Shield className="w-3.5 h-3.5 stroke-[1.5]" />
                Seller
              </Link>
            )}

            {/* Account / Login */}
            <button
              onClick={handleAccountClick}
              className="p-2 text-ink hover:text-accent transition-colors flex items-center gap-1.5"
              aria-label="My Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {isAuthenticated ? (
                <span className="hidden lg:inline text-[11px] uppercase tracking-eyebrow text-ink font-medium max-w-[85px] truncate">
                  {user?.name?.split(' ')[0]}
                </span>
              ) : (
                <span className="hidden lg:inline text-[11px] uppercase tracking-eyebrow text-ink-muted hover:text-ink font-medium">
                  Sign In
                </span>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-ink hover:text-accent hover:bg-surface border border-transparent hover:border-hairline focus:outline-none focus-visible:ring-1 focus-visible:ring-accent transition-all duration-200"
              aria-label={isDark ? 'Switch to Light Mode (currently in Dark Mode)' : 'Switch to Dark Mode (currently in Light Mode)'}
              title={isDark ? 'Switch to Light Mode (currently Dark)' : 'Switch to Dark Mode (currently Light)'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5] transition-transform duration-300 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5] transition-transform duration-300 -rotate-12 hover:rotate-0" />
              )}
            </button>

            {/* Bag Drawer Trigger */}
            <button
              onClick={() => dispatch(toggleCartDrawer())}
              className="relative p-2 text-ink hover:text-accent transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-ink text-canvas text-[9px] font-bold rounded-none flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Form */}
        {searchOpen && (
          <div className="py-4 border-t border-hairline">
            <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search shirts, jeans, jackets, linen tees..."
                autoFocus
                className="flex-1 bg-surface border border-hairline px-4 py-2.5 text-xs uppercase tracking-eyebrow text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-ink"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-ink text-canvas text-xs uppercase tracking-eyebrow font-medium hover:bg-ink/90 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-hairline bg-surface p-6 space-y-4">
          <nav className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-hairline">
              <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-medium">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1 bg-canvas border border-hairline text-xs uppercase tracking-eyebrow text-ink"
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>

            <Link
              to="/products"
              onClick={() => dispatch(closeMobileMenu())}
              className="block text-xs uppercase tracking-eyebrow text-ink font-semibold py-1 border-b border-hairline pb-2"
            >
              All Garments
            </Link>
            {navCategories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.path}
                onClick={() => dispatch(closeMobileMenu())}
                className="block text-xs uppercase tracking-eyebrow text-ink-muted hover:text-ink font-medium py-1"
              >
                {cat.label}
              </Link>
            ))}

            {isSeller && (
              <div className="pt-2 border-t border-hairline">
                <Link
                  to="/seller"
                  onClick={() => dispatch(closeMobileMenu())}
                  className="flex items-center gap-2 text-xs uppercase tracking-eyebrow text-accent font-medium py-1"
                >
                  <Shield className="w-4 h-4 stroke-[1.5]" />
                  Seller Dashboard
                </Link>
              </div>
            )}

            {/* Mobile Theme Toggle Row */}
            <div className="pt-3 pb-1 border-t border-hairline flex items-center justify-between">
              <span className="text-xs uppercase tracking-eyebrow text-ink font-medium">
                Theme
              </span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 border border-hairline text-xs uppercase tracking-eyebrow text-ink bg-surface hover:border-ink transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            {isAuthenticated ? (
              <div className="pt-4 border-t border-hairline space-y-2">
                <Link
                  to="/account"
                  onClick={() => dispatch(closeMobileMenu())}
                  className="block text-xs uppercase tracking-eyebrow text-ink font-medium"
                >
                  My Account ({user?.name})
                </Link>
                <Link
                  to="/orders"
                  onClick={() => dispatch(closeMobileMenu())}
                  className="block text-xs uppercase tracking-eyebrow text-ink-muted hover:text-ink"
                >
                  Order History
                </Link>
                <button
                  onClick={() => {
                    signOut()
                    dispatch(closeMobileMenu())
                  }}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-eyebrow text-critical pt-2"
                >
                  <LogOut className="w-3.5 h-3.5 stroke-[1.5]" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-hairline space-y-2">
                <Link
                  to="/auth/login"
                  onClick={() => dispatch(closeMobileMenu())}
                  className="block w-full py-2.5 bg-ink text-canvas text-xs uppercase tracking-eyebrow text-center font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => dispatch(closeMobileMenu())}
                  className="block w-full py-2.5 border border-hairline text-ink text-xs uppercase tracking-eyebrow text-center font-medium bg-canvas"
                >
                  Create Account
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

