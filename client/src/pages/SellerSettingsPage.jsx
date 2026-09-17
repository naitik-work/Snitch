import React from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { SellerNav } from '../components/SellerNav'
import { ShieldCheck, Store, MapPin, IndianRupee, Layers } from 'lucide-react'

export const SellerSettingsPage = () => {
  const { user } = useAuth()

  return (
    <div>
      <SellerNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border-b border-hairline pb-6 mb-8">
          <span className="text-xs uppercase tracking-eyebrow text-accent font-medium">
            Configuration
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-ink font-normal mt-1">
            Atelier & Merchant Settings
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            Storefront credentials, regional delivery parameters, and catalog policies.
          </p>
        </div>

        <div className="space-y-6">
          {/* Merchant Profile */}
          <div className="bg-surface border border-hairline p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-4 border-b border-hairline mb-6">
              <ShieldCheck className="w-5 h-5 text-positive" />
              <h2 className="font-serif text-xl text-ink font-normal">
                Verified Seller Credentials
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-canvas border border-hairline">
                <span className="uppercase tracking-eyebrow text-ink-muted block mb-1">
                  Merchant Name
                </span>
                <span className="text-sm font-medium text-ink">{user?.name}</span>
              </div>
              <div className="p-4 bg-canvas border border-hairline">
                <span className="uppercase tracking-eyebrow text-ink-muted block mb-1">
                  Registered Email
                </span>
                <span className="text-sm font-medium text-ink">{user?.email}</span>
              </div>
              <div className="p-4 bg-canvas border border-hairline">
                <span className="uppercase tracking-eyebrow text-ink-muted block mb-1">
                  Authorization Role
                </span>
                <span className="inline-block px-2 py-0.5 bg-sand/30 border border-hairline text-ink font-mono uppercase">
                  {user?.role}
                </span>
              </div>
              <div className="p-4 bg-canvas border border-hairline">
                <span className="uppercase tracking-eyebrow text-ink-muted block mb-1">
                  Operating Currency
                </span>
                <span className="text-sm font-medium text-ink flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5" />
                  INR (Indian Rupee · ₹)
                </span>
              </div>
            </div>
          </div>

          {/* Regional Fulfillment Policies */}
          <div className="bg-surface border border-hairline p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-4 border-b border-hairline mb-6">
              <Store className="w-5 h-5 text-ink" />
              <h2 className="font-serif text-xl text-ink font-normal">
                Storefront Operating Policies
              </h2>
            </div>

            <div className="space-y-4 text-xs text-ink-muted leading-relaxed">
              <div className="flex items-start gap-3 p-3 bg-canvas border border-hairline">
                <MapPin className="w-4 h-4 text-ink flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink uppercase tracking-eyebrow block mb-0.5">
                    Domestic Shipping Standard
                  </strong>
                  Complimentary doorstep delivery on all orders nationwide. Dispatch within 24–48 hours of order placement.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-canvas border border-hairline">
                <Layers className="w-4 h-4 text-ink flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink uppercase tracking-eyebrow block mb-0.5">
                    Standard Sizing Matrix
                  </strong>
                  All catalog items comply with the Snitch bespoke menswear sizing framework: XS, S, M, L, XL, XXL.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
