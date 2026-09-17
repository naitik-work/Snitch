import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../features/products/hooks/useProducts'
import { ProductGrid } from '../features/products/ui/ProductGrid'
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react'

export const HomePage = () => {
  const { products, isLoading, error, loadProducts } = useProducts(true)

  useEffect(() => {
    loadProducts(1)
  }, [loadProducts])

  const featuredList = products.slice(0, 8)

  const categoryItems = [
    {
      name: 'Men',
      cat: 'Men',
      desc: 'Complete seasonal wardrobe',
      img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Tailored Shirts',
      cat: 'Shirts',
      desc: 'Poplin, linen & pinpoint Oxford',
      img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Heavyweight Tees',
      cat: 'T-Shirts',
      desc: 'Compact combed cotton jersey',
      img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Polo Shirts',
      cat: 'Polo Shirts',
      desc: 'Breathable pique knit & open collar',
      img: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Outerwear & Jackets',
      cat: 'Jackets',
      desc: 'Unstructured blazers & overshirts',
      img: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Knitwear & Hoodies',
      cat: 'Hoodies',
      desc: 'Loopback fleece & merino wool',
      img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Tailored Joggers',
      cat: 'Joggers',
      desc: 'Tapered luxury lounge trousers',
      img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Tailored Shorts',
      cat: 'Shorts',
      desc: 'Pleated linen & chino cloth',
      img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop&q=80',
    },
  ]

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Editorial Hero Section */}
      <section className="bg-surface border-b border-hairline overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Editorial Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-accent font-medium">
                <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
                Autumn Atelier Series · 2026
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-ink font-normal leading-[1.08] tracking-tight">
                Quiet luxury for the discerning man.
              </h1>
              <p className="text-sm md:text-base text-ink-muted max-w-lg leading-relaxed">
                Elevating everyday garments through bespoke tailoring, architectural drape, and tactile natural fibers. Crafted without compromise.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-canvas text-xs uppercase tracking-eyebrow font-medium hover:bg-ink/90 transition-colors"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </Link>
                <Link
                  to="/products?category=Shirts"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-hairline bg-surface text-ink text-xs uppercase tracking-eyebrow font-medium hover:border-ink transition-colors"
                >
                  Tailored Shirts
                </Link>
              </div>
            </div>

            {/* Hero Editorial Imagery */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden border border-hairline bg-canvas">
                <img
                  src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1200&auto=format&fit=crop&q=85"
                  alt="Snitch Menswear Atelier"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-canvas border border-hairline text-xs">
                  <span className="uppercase tracking-eyebrow text-[10px] text-ink-muted block">
                    Look 04 · Autumn Capsule
                  </span>
                  <span className="font-serif text-sm text-ink">
                    Relaxed Linen Trouser & Structured Overshirt
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Spotlight (8 canonical menswear categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-hairline">
          <div>
            <span className="text-xs uppercase tracking-eyebrow text-ink-muted">Curation</span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink font-normal mt-1">
              Shop by Wardrobe Essential
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-eyebrow text-ink underline underline-offset-4 hover:text-accent transition-colors mt-2 sm:mt-0"
          >
            View All Categories
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categoryItems.map((item) => (
            <Link
              key={item.name}
              to={`/products?category=${item.cat}`}
              className="group block relative aspect-[3/4] overflow-hidden bg-surface border border-hairline"
            >
              <img
                src={item.img}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 bg-ink/90 dark:bg-surface/95 p-4 text-canvas dark:text-ink flex flex-col justify-end transition-colors">
                <span className="text-xs uppercase tracking-eyebrow font-medium">
                  {item.name}
                </span>
                <span className="text-[10px] text-sand dark:text-ink-secondary font-light mt-0.5">
                  {item.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products (Using Real Backend API Data) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-hairline">
          <div>
            <span className="text-xs uppercase tracking-eyebrow text-ink-muted">New Arrivals</span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink font-normal mt-1">
              Featured Garments
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-eyebrow text-ink underline underline-offset-4 hover:text-accent transition-colors mt-2 sm:mt-0"
          >
            Explore Complete Catalog
          </Link>
        </div>

        <ProductGrid products={featuredList} isLoading={isLoading} error={error} />
      </section>

      {/* Editorial Statement */}
      <section className="border-y border-hairline bg-surface py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-eyebrow text-accent font-medium block">
            Philosophy
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-ink font-normal leading-tight">
            "Clothing engineered for proportion, tactile substance, and quiet permanence."
          </h2>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
            Snitch is dedicated to timeless garment architecture. Every silhouette is cut with disciplined precision, utilizing natural organic fibers tailored for modern life in India.
          </p>
          <div className="pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-canvas text-xs uppercase tracking-eyebrow font-medium hover:bg-ink/90 transition-colors"
            >
              Browse The Atelier
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="space-y-3 p-6 bg-surface border border-hairline">
            <Truck className="w-6 h-6 text-ink stroke-[1.5]" />
            <h3 className="font-serif text-xl text-ink">Complimentary Delivery</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Doorstep courier dispatch on all garment orders across India with real-time tracking.
            </p>
          </div>
          <div className="space-y-3 p-6 bg-surface border border-hairline">
            <Shield className="w-6 h-6 text-ink stroke-[1.5]" />
            <h3 className="font-serif text-xl text-ink">Boutique Quality</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Precision stitch counts, reinforced French seams, and enduring organic yarns.
            </p>
          </div>
          <div className="space-y-3 p-6 bg-surface border border-hairline">
            <Sparkles className="w-6 h-6 text-ink stroke-[1.5]" />
            <h3 className="font-serif text-xl text-ink">7-Day Boutique Exchanges</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Effortless size swaps and doorstep reverse pickups for total peace of mind.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

