import React, { useEffect } from 'react'
import { useSellerProducts } from '../features/products/hooks/useSellerProducts'
import { SellerProductList } from '../features/products/ui/SellerProductList'
import { SellerNav } from '../components/SellerNav'

export const SellerProductsPage = () => {
  const {
    sellerProducts,
    isLoading,
    error,
    totalPages,
    currentPage,
    loadSellerProducts,
    togglePublish,
  } = useSellerProducts()

  useEffect(() => {
    loadSellerProducts(1)
  }, [loadSellerProducts])

  return (
    <div>
      <SellerNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <SellerProductList
          products={sellerProducts}
          isLoading={isLoading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={loadSellerProducts}
          onTogglePublish={togglePublish}
        />
      </div>
    </div>
  )
}
