import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useOrders } from '../features/orders/hooks/useOrders'
import { SellerNav } from '../components/SellerNav'
import { Info, ExternalLink } from 'lucide-react'

export const SellerOrdersPage = () => {
  const { orders, isLoading, error, loadOrders, updateStatus } = useOrders()

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const formatPrice = (amount, currency = 'INR') => {
    if (currency === 'INR') {
      return `₹${Number(amount || 0).toLocaleString('en-IN')}`
    }
    return `${currency} ${Number(amount || 0).toFixed(2)}`
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-positive/10 text-positive border-positive/30'
      case 'SHIPPED':
        return 'bg-sand/30 text-ink border-sand'
      case 'CANCELLED':
        return 'bg-critical/10 text-critical border-critical/30'
      case 'PLACED':
      default:
        return 'bg-ink/5 text-ink border-hairline'
    }
  }

  return (
    <div>
      <SellerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="border-b border-hairline pb-6 mb-6">
          <span className="text-xs uppercase tracking-eyebrow text-accent font-medium">
            Logistics & Fulfillment
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-ink font-normal mt-1">
            Store Orders Management
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            Review buyer orders, inspect customer shipping destinations, and update dispatch status.
          </p>
        </div>

        {/* Recruiter / Engineering Architecture Notice */}
        <div className="mb-8 p-5 bg-surface border border-hairline flex items-start gap-3">
          <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-medium text-ink uppercase tracking-eyebrow block">
              Full-Stack Architecture Note · Backend Status Integration
            </span>
            <p className="text-ink-muted leading-relaxed">
              <strong className="text-ink">Backend Limitation:</strong> The existing backend order endpoint (<code className="bg-canvas px-1.5 py-0.5 border border-hairline">GET /api/orders</code>) is scoped by buyer ID (<code className="bg-canvas px-1.5 py-0.5 border border-hairline">user: req.user.id</code>). A dedicated seller aggregation endpoint (<code className="bg-canvas px-1.5 py-0.5 border border-hairline">GET /api/orders/seller</code>) can be seamlessly integrated into this view.
            </p>
            <p className="text-ink-muted leading-relaxed">
              <strong className="text-ink">Active Real Endpoint:</strong> Status updates utilize the live backend mutation (<code className="bg-canvas px-1.5 py-0.5 border border-hairline">PATCH /api/orders/status/:orderid</code>) supporting <span className="font-mono text-ink">PLACED</span>, <span className="font-mono text-ink">SHIPPED</span>, and <span className="font-mono text-ink">DELIVERED</span>.
            </p>
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
              Loading store orders...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center border border-hairline bg-surface p-8">
            <p className="text-sm text-ink-muted">No orders found.</p>
          </div>
        ) : (
          <div className="border border-hairline bg-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-canvas border-b border-hairline uppercase tracking-eyebrow text-ink-muted text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 font-medium">Order ID / Date</th>
                    <th className="py-3.5 px-4 font-medium">Garments</th>
                    <th className="py-3.5 px-4 font-medium">Total</th>
                    <th className="py-3.5 px-4 font-medium">Destination</th>
                    <th className="py-3.5 px-4 font-medium">Status</th>
                    <th className="py-3.5 px-4 font-medium">Update Status</th>
                    <th className="py-3.5 px-4 font-medium text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline text-ink">
                  {orders.map((order) => {
                    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })

                    return (
                      <tr key={order._id} className="hover:bg-canvas/40 transition-colors">
                        <td className="py-4 px-4 align-top">
                          <span className="font-medium text-ink block font-mono">#{order._id.slice(-6)}</span>
                          <span className="text-[11px] text-ink-muted">{formattedDate}</span>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <div className="space-y-1">
                            {order.products?.map((p, i) => (
                              <div key={i} className="text-xs">
                                <span className="font-medium">{p.product?.title}</span>
                                <span className="text-ink-muted text-[11px] block">
                                  Size: {p.size} · Qty: {p.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-4 px-4 font-medium align-top">
                          {formatPrice(order.totalPrice?.amount, order.totalPrice?.currency)}
                        </td>

                        <td className="py-4 px-4 align-top text-xs text-ink-muted max-w-xs">
                          <span>
                            {order.address?.house}, {order.address?.street}, {order.address?.city}
                          </span>
                          <span className="block text-[11px]">
                            {order.address?.state} - {order.address?.zip}
                          </span>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <span
                            className={`inline-block px-2.5 py-1 text-[10px] uppercase tracking-eyebrow font-medium border ${getStatusBadge(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <select
                            value={order.status}
                            disabled={['DELIVERED', 'CANCELLED'].includes(order.status)}
                            onChange={(e) => updateStatus(order._id, e.target.value)}
                            className="bg-canvas border border-hairline px-2.5 py-1.5 text-xs text-ink uppercase tracking-eyebrow focus:outline-none focus:border-ink disabled:opacity-40"
                          >
                            <option value="PLACED">PLACED</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                          </select>
                        </td>

                        <td className="py-4 px-4 text-right align-top">
                          <Link
                            to={`/seller/orders/${order._id}`}
                            className="p-1.5 border border-hairline hover:border-ink text-ink-muted hover:text-ink inline-block transition-colors"
                            title="View Order Details"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
