import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useOrders } from '../features/orders/hooks/useOrders'
import { ArrowLeft, CheckCircle2, Package, Truck, XCircle, Clock } from 'lucide-react'

export const OrderDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { orders, isLoading, cancelOrder, loadOrders } = useOrders()
  const [cancelling, setCancelling] = useState(false)
  const [cancelMessage, setCancelMessage] = useState('')

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

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return
    setCancelling(true)
    const success = await cancelOrder(id)
    if (success) {
      setCancelMessage('Order has been cancelled successfully.')
    }
    setCancelling(false)
  }

  if (isLoading && !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <span className="inline-block animate-spin border-2 border-ink border-t-transparent rounded-full w-8 h-8" />
        <p className="text-xs uppercase tracking-eyebrow text-ink-muted mt-4">
          Loading order details...
        </p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center border border-hairline bg-surface my-12">
        <Package className="w-10 h-10 text-ink-muted mx-auto mb-3 stroke-[1.5]" />
        <h2 className="font-serif text-2xl text-ink mb-2">Order Not Found</h2>
        <p className="text-xs uppercase tracking-eyebrow text-ink-muted mb-6">
          The requested order was not found in your account history.
        </p>
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-canvas text-xs uppercase tracking-eyebrow font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
      </div>
    )
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const canCancel = order.status === 'PLACED'

  const stages = ['PLACED', 'SHIPPED', 'DELIVERED']
  const isCancelled = order.status === 'CANCELLED'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header Bar */}
      <div className="border-b border-hairline pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/orders"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-eyebrow text-ink-muted hover:text-ink transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Orders
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl text-ink font-normal">
            Order #{order._id}
          </h1>
          <p className="text-xs text-ink-muted mt-1">Placed on {orderDate}</p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 text-xs uppercase tracking-eyebrow font-medium border ${
              order.status === 'DELIVERED'
                ? 'bg-positive/10 text-positive border-positive/30'
                : order.status === 'CANCELLED'
                ? 'bg-critical/10 text-critical border-critical/30'
                : 'bg-sand/30 text-ink border-sand'
            }`}
          >
            {order.status}
          </span>
          {canCancel && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={cancelling}
              className="px-4 py-2 border border-critical text-critical text-xs uppercase tracking-eyebrow hover:bg-critical/10 transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              <XCircle className="w-3.5 h-3.5" />
              {cancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
        </div>
      </div>

      {cancelMessage && (
        <div className="mb-6 p-4 bg-positive/10 border border-positive/30 text-positive text-xs">
          {cancelMessage}
        </div>
      )}

      {/* Status Timeline */}
      <div className="bg-surface border border-hairline p-6 mb-8">
        <h3 className="text-xs uppercase tracking-eyebrow text-ink font-medium mb-4">
          Order Status Tracker
        </h3>
        {isCancelled ? (
          <div className="flex items-center gap-3 p-4 bg-critical/10 border border-critical/20 text-critical text-xs">
            <XCircle className="w-5 h-5 flex-shrink-0" />
            <span>This order was cancelled. No delivery will be dispatched.</span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {stages.map((stage, idx) => {
              const stageIndex = stages.indexOf(order.status)
              const isCompleted = stageIndex >= idx
              const isCurrent = order.status === stage

              return (
                <div key={stage} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-none flex items-center justify-center border text-xs font-medium mb-2 ${
                      isCompleted
                        ? 'bg-ink text-canvas border-ink'
                        : 'bg-canvas text-ink-muted border-hairline'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`uppercase tracking-eyebrow text-[11px] ${
                      isCurrent
                        ? 'text-ink font-semibold'
                        : isCompleted
                        ? 'text-ink'
                        : 'text-ink-muted'
                    }`}
                  >
                    {stage}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Grid: Address & Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Destination */}
        <div className="bg-surface border border-hairline p-6">
          <span className="text-xs uppercase tracking-eyebrow text-ink-muted block mb-2">
            Shipping Destination
          </span>
          <p className="text-sm font-medium text-ink">{order.address?.house}</p>
          <p className="text-sm text-ink-muted">{order.address?.street}</p>
          <p className="text-sm text-ink-muted">
            {order.address?.city}, {order.address?.state} - {order.address?.zip}
          </p>
          <div className="mt-4 pt-4 border-t border-hairline flex items-center gap-2 text-xs text-ink-muted">
            <Truck className="w-4 h-4 text-ink" />
            <span>Standard Express Courier Dispatch</span>
          </div>
        </div>

        {/* Payment & Charges */}
        <div className="bg-surface border border-hairline p-6 space-y-3">
          <span className="text-xs uppercase tracking-eyebrow text-ink-muted block mb-2">
            Payment Summary
          </span>
          <div className="flex justify-between text-xs text-ink-muted">
            <span>Subtotal</span>
            <span className="text-ink font-medium">
              {formatPrice(order.totalPrice?.amount, order.totalPrice?.currency)}
            </span>
          </div>
          <div className="flex justify-between text-xs text-ink-muted">
            <span>Shipping</span>
            <span className="text-positive uppercase tracking-eyebrow font-medium">
              Complimentary
            </span>
          </div>
          <div className="flex justify-between text-xs text-ink-muted">
            <span>Payment Mode</span>
            <span className="text-ink">Pay on Delivery / Invoice</span>
          </div>
          <div className="border-t border-hairline pt-3 flex justify-between items-center text-sm">
            <span className="font-medium text-ink">Total Amount</span>
            <span className="font-serif text-2xl text-ink font-normal">
              {formatPrice(order.totalPrice?.amount, order.totalPrice?.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Products in this order */}
      <div className="bg-surface border border-hairline p-6 sm:p-8">
        <h3 className="font-serif text-xl text-ink border-b border-hairline pb-4 mb-6">
          Garments in this Order ({order.products?.length || 0})
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
                    Size: <span className="text-ink font-medium">{item.size}</span> · Quantity: <span className="text-ink font-medium">{item.quantity}</span>
                  </p>
                  <p className="text-xs text-ink-muted">
                    {formatPrice(item.product?.price?.amount, item.product?.price?.currency)} per unit
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
  )
}
