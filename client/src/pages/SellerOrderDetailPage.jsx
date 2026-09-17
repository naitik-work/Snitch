import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useOrders } from '../features/orders/hooks/useOrders'
import { SellerNav } from '../components/SellerNav'
import { ArrowLeft, Package, Truck, CheckCircle2 } from 'lucide-react'

export const SellerOrderDetailPage = () => {
  const { id } = useParams()
  const { orders, isLoading, loadOrders, updateStatus } = useOrders()
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState('')

  useEffect(() => {
    if (orders.length === 0) {
      loadOrders()
    }
  }, [orders.length, loadOrders])

  const order = orders.find((o) => o._id === id || o.id === id)

  const formatPrice = (amount, currency = 'INR') => {
    if (currency === 'INR') {
      return `₹${Number(amount || 0).toLocaleString('en-IN')}`
    }
    return `${currency} ${Number(amount || 0).toFixed(2)}`
  }

  const handleStatusChange = async (newStatus) => {
    const success = await updateStatus(id, newStatus)
    if (success) {
      setStatusUpdateSuccess(`Order status updated to ${newStatus}`)
      setTimeout(() => setStatusUpdateSuccess(''), 4000)
    }
  }

  if (isLoading && !order) {
    return (
      <div>
        <SellerNav />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <span className="inline-block animate-spin border-2 border-ink border-t-transparent rounded-full w-8 h-8" />
          <p className="text-xs uppercase tracking-eyebrow text-ink-muted mt-4">
            Loading order details...
          </p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div>
        <SellerNav />
        <div className="max-w-md mx-auto py-20 px-4 text-center border border-hairline bg-surface my-12">
          <Package className="w-10 h-10 text-ink-muted mx-auto mb-3 stroke-[1.5]" />
          <h2 className="font-serif text-2xl text-ink mb-2">Order Not Found</h2>
          <p className="text-xs uppercase tracking-eyebrow text-ink-muted mb-6">
            The requested store order could not be located.
          </p>
          <Link
            to="/seller/orders"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-canvas text-xs uppercase tracking-eyebrow font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store Orders
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div>
      <SellerNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="border-b border-hairline pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              to="/seller/orders"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-eyebrow text-ink-muted hover:text-ink transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Orders
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl text-ink font-normal">
              Fulfillment: Order #{order._id}
            </h1>
            <p className="text-xs text-ink-muted mt-1">Placed on {formattedDate}</p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs uppercase tracking-eyebrow text-ink font-medium">
              Logistics Status:
            </label>
            <select
              value={order.status}
              disabled={['DELIVERED', 'CANCELLED'].includes(order.status)}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-canvas border border-hairline px-3 py-2 text-xs uppercase tracking-eyebrow text-ink focus:outline-none focus:border-ink font-medium"
            >
              <option value="PLACED">PLACED</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
            </select>
          </div>
        </div>

        {statusUpdateSuccess && (
          <div className="mb-6 p-4 bg-positive/10 border border-positive/30 text-positive text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusUpdateSuccess}</span>
          </div>
        )}

        {/* Customer & Address Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-surface border border-hairline p-6">
            <span className="text-xs uppercase tracking-eyebrow text-ink-muted block mb-3">
              Delivery Address
            </span>
            <p className="text-sm font-medium text-ink">{order.address?.house}</p>
            <p className="text-sm text-ink-muted">{order.address?.street}</p>
            <p className="text-sm text-ink-muted">
              {order.address?.city}, {order.address?.state} - {order.address?.zip}
            </p>
            <div className="mt-4 pt-4 border-t border-hairline flex items-center gap-2 text-xs text-ink-muted">
              <Truck className="w-4 h-4 text-ink" />
              <span>India Express Courier Service</span>
            </div>
          </div>

          <div className="bg-surface border border-hairline p-6 space-y-3">
            <span className="text-xs uppercase tracking-eyebrow text-ink-muted block mb-3">
              Order Financials
            </span>
            <div className="flex justify-between text-xs text-ink-muted">
              <span>Subtotal</span>
              <span className="text-ink font-medium">
                {formatPrice(order.totalPrice?.amount, order.totalPrice?.currency)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-ink-muted">
              <span>Customer Shipping</span>
              <span className="text-positive uppercase tracking-eyebrow font-medium">
                Complimentary
              </span>
            </div>
            <div className="border-t border-hairline pt-3 flex justify-between items-center text-sm">
              <span className="font-medium text-ink">Total Billed</span>
              <span className="font-serif text-2xl text-ink font-normal">
                {formatPrice(order.totalPrice?.amount, order.totalPrice?.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="bg-surface border border-hairline p-6 sm:p-8">
          <h3 className="font-serif text-xl text-ink border-b border-hairline pb-4 mb-6">
            Ordered Garments ({order.products?.length || 0})
          </h3>
          <div className="divide-y divide-hairline">
            {order.products?.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.product?.image ||
                      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
                    }
                    alt={item.product?.title}
                    className="w-16 h-20 object-cover bg-canvas border border-hairline"
                  />
                  <div>
                    <h4 className="font-serif text-base text-ink">{item.product?.title}</h4>
                    <p className="text-xs text-ink-muted mt-1">
                      Size: <span className="font-medium text-ink">{item.size}</span> · Quantity: <span className="font-medium text-ink">{item.quantity}</span>
                    </p>
                    <p className="text-xs text-ink-muted">
                      {formatPrice(item.product?.price?.amount, item.product?.price?.currency)} each
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-ink">
                  {formatPrice(
                    (item.product?.price?.amount || 0) * item.quantity,
                    item.product?.price?.currency
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
