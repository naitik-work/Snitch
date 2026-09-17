import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSellerProducts } from '../features/products/hooks/useSellerProducts'
import { SellerNav } from '../components/SellerNav'
import { AlertTriangle, CheckCircle, XCircle, Edit2, Image as ImageIcon } from 'lucide-react'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const SellerInventoryPage = () => {
  const {
    sellerProducts,
    isLoading,
    error,
    totalPages,
    currentPage,
    loadSellerProducts,
  } = useSellerProducts()

  const [filter, setFilter] = useState('ALL') // 'ALL' | 'LOW' | 'OUT'

  useEffect(() => {
    loadSellerProducts(1)
  }, [loadSellerProducts])

  const formatPrice = (amount, currency = 'INR') => {
    if (currency === 'INR') {
      return `₹${Number(amount || 0).toLocaleString('en-IN')}`
    }
    return `${currency} ${Number(amount || 0).toFixed(2)}`
  }

  // Filter products by stock status
  const filteredProducts = sellerProducts.filter((product) => {
    const totalStock = product.sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || 0
    const hasLowStock = product.sizes?.some((s) => s.stock > 0 && s.stock <= 5)

    if (filter === 'LOW') {
      return hasLowStock || (totalStock > 0 && totalStock <= 15)
    }
    if (filter === 'OUT') {
      return totalStock === 0
    }
    return true
  })

  return (
    <div>
      <SellerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="border-b border-hairline pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-eyebrow text-accent font-medium">
              Stock Operations
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-ink font-normal mt-1">
              Garment Inventory Matrix
            </h1>
            <p className="text-xs text-ink-muted mt-1">
              Real-time size breakdown (XS–XXL) and low-stock indicators across your active catalog.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-4 py-2 text-xs uppercase tracking-eyebrow font-medium transition-all ${
                filter === 'ALL'
                  ? 'bg-ink text-canvas'
                  : 'bg-surface border border-hairline text-ink hover:border-ink'
              }`}
            >
              All Items ({sellerProducts.length})
            </button>
            <button
              onClick={() => setFilter('LOW')}
              className={`px-4 py-2 text-xs uppercase tracking-eyebrow font-medium transition-all ${
                filter === 'LOW'
                  ? 'bg-accent text-canvas'
                  : 'bg-surface border border-hairline text-accent hover:border-accent'
              }`}
            >
              Low Stock (≤5)
            </button>
            <button
              onClick={() => setFilter('OUT')}
              className={`px-4 py-2 text-xs uppercase tracking-eyebrow font-medium transition-all ${
                filter === 'OUT'
                  ? 'bg-critical text-canvas'
                  : 'bg-surface border border-hairline text-critical hover:border-critical'
              }`}
            >
              Sold Out
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-critical/10 border border-critical text-critical text-xs">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="py-20 text-center">
            <span className="inline-block animate-spin border-2 border-ink border-t-transparent rounded-full w-8 h-8" />
            <p className="text-xs uppercase tracking-eyebrow text-ink-muted mt-4">
              Loading inventory matrix...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-hairline bg-surface p-8">
            <p className="text-sm text-ink-muted mb-2">No garments match the selected inventory filter.</p>
            <button
              onClick={() => setFilter('ALL')}
              className="text-xs uppercase tracking-eyebrow text-ink underline"
            >
              Reset to All Items
            </button>
          </div>
        ) : (
          <div className="border border-hairline bg-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-canvas border-b border-hairline uppercase tracking-eyebrow text-ink-muted text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 font-medium min-w-[240px]">Garment</th>
                    {SIZES.map((sz) => (
                      <th key={sz} className="py-3.5 px-3 font-medium text-center">
                        {sz}
                      </th>
                    ))}
                    <th className="py-3.5 px-4 font-medium text-center">Total</th>
                    <th className="py-3.5 px-4 font-medium">Status</th>
                    <th className="py-3.5 px-4 font-medium text-right">Edit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline text-ink">
                  {filteredProducts.map((product) => {
                    const id = product._id || product.id
                    const mainImage = product.images?.[0]?.url
                    const totalStock =
                      product.sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || 0

                    const hasLowStockSize = product.sizes?.some(
                      (s) => s.stock > 0 && s.stock <= 5
                    )
                    const isSoldOut = totalStock === 0

                    return (
                      <tr key={id} className="hover:bg-canvas/40 transition-colors">
                        {/* Garment Title & Image */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-12 bg-canvas border border-hairline flex-shrink-0 overflow-hidden">
                              {mainImage ? (
                                <img
                                  src={mainImage}
                                  alt={product.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-ink-muted">
                                  <ImageIcon className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                            <div>
                              <Link
                                to={`/seller/products/edit/${id}`}
                                className="font-medium text-sm text-ink hover:text-accent transition-colors block line-clamp-1"
                              >
                                {product.title}
                              </Link>
                              <span className="text-[11px] text-ink-muted">
                                {formatPrice(product.price?.amount, product.price?.currency)}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Size Columns */}
                        {SIZES.map((sz) => {
                          const sizeObj = product.sizes?.find((s) => s.size === sz)
                          const stock = sizeObj ? sizeObj.stock : 0
                          const isLow = stock > 0 && stock <= 5
                          const isZero = stock === 0

                          return (
                            <td key={sz} className="py-4 px-3 text-center">
                              <span
                                className={`inline-block px-2 py-1 font-mono text-[11px] border ${
                                  isZero
                                    ? 'bg-critical/10 text-critical border-critical/30'
                                    : isLow
                                    ? 'bg-accent/10 text-accent border-accent/40 font-bold'
                                    : 'bg-canvas text-ink border-hairline'
                                }`}
                              >
                                {stock}
                              </span>
                            </td>
                          )
                        })}

                        {/* Total Stock */}
                        <td className="py-4 px-4 text-center font-bold font-mono">
                          {totalStock}
                        </td>

                        {/* Stock Status Tag */}
                        <td className="py-4 px-4">
                          {isSoldOut ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-eyebrow font-medium bg-critical/10 text-critical border border-critical/30">
                              <XCircle className="w-3 h-3" />
                              Sold Out
                            </span>
                          ) : hasLowStockSize ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-eyebrow font-medium bg-accent/10 text-accent border border-accent/30">
                              <AlertTriangle className="w-3 h-3" />
                              Low Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-eyebrow font-medium bg-positive/10 text-positive border border-positive/30">
                              <CheckCircle className="w-3 h-3" />
                              Optimal
                            </span>
                          )}
                        </td>

                        {/* Edit Action */}
                        <td className="py-4 px-4 text-right">
                          <Link
                            to={`/seller/products/edit/${id}`}
                            className="p-1.5 border border-hairline hover:border-ink text-ink-muted hover:text-ink inline-block transition-colors"
                            title="Edit Stock Levels"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-hairline px-4 py-3 bg-canvas flex items-center justify-between text-xs">
                <span className="text-ink-muted uppercase tracking-eyebrow">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => loadSellerProducts(currentPage - 1)}
                    className="px-3 py-1 border border-hairline bg-surface disabled:opacity-40 uppercase tracking-eyebrow"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => loadSellerProducts(currentPage + 1)}
                    className="px-3 py-1 border border-hairline bg-surface disabled:opacity-40 uppercase tracking-eyebrow"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
