import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect, useMemo } from 'react'
import {
  fetchProducts,
  setSelectedCategory,
  setSearchQuery,
  setSortBy,
  setSelectedProduct,
} from '../state/productSlice'

export const useProducts = (autoFetch = false, page = 1) => {
  const dispatch = useDispatch()
  const {
    items,
    totalPages,
    currentPage,
    isLoading,
    error,
    selectedCategory,
    searchQuery,
    sortBy,
    selectedProduct,
  } = useSelector((state) => state.products)

  useEffect(() => {
    if (autoFetch) {
      dispatch(fetchProducts({ page, category: selectedCategory }))
    }
  }, [dispatch, autoFetch, page, selectedCategory])

  const loadProducts = useCallback(
    (targetPage = 1, targetCategory = selectedCategory) => {
      return dispatch(fetchProducts({ page: targetPage, category: targetCategory }))
    },
    [dispatch, selectedCategory]
  )

  const changeCategory = useCallback(
    (category) => {
      dispatch(setSelectedCategory(category))
    },
    [dispatch]
  )

  const changeSearchQuery = useCallback(
    (query) => {
      dispatch(setSearchQuery(query))
    },
    [dispatch]
  )

  const changeSortBy = useCallback(
    (sort) => {
      dispatch(setSortBy(sort))
    },
    [dispatch]
  )

  const selectProduct = useCallback(
    (product) => {
      dispatch(setSelectedProduct(product))
    },
    [dispatch]
  )

  // Filtered and sorted products for client display
  const filteredProducts = useMemo(() => {
    let result = [...items]

    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter((p) =>
        p.categories?.some(
          (c) => c.toLowerCase() === selectedCategory.toLowerCase()
        )
      )
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.categories?.some((c) => c.toLowerCase().includes(q))
      )
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => (a.price?.amount || 0) - (b.price?.amount || 0))
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => (b.price?.amount || 0) - (a.price?.amount || 0))
    }

    return result
  }, [items, selectedCategory, searchQuery, sortBy])

  // Extract all unique categories with canonical seed categories
  const allCategories = useMemo(() => {
    const canonical = [
      'All',
      'Men',
      'T-Shirts',
      'Shirts',
      'Jeans',
      'Hoodies',
      'Jackets',
      'Joggers',
      'Shorts',
    ]
    const set = new Set(canonical)
    items.forEach((p) => {
      p.categories?.forEach((c) => set.add(c))
    })
    return Array.from(set)
  }, [items])

  return {
    products: filteredProducts,
    allProducts: items,
    totalPages,
    currentPage,
    isLoading,
    error,
    selectedCategory,
    searchQuery,
    sortBy,
    selectedProduct,
    allCategories,
    loadProducts,
    changeCategory,
    changeSearchQuery,
    changeSortBy,
    selectProduct,
  }
}
