'use client'

import { useContext } from 'react'
import { CategoryContext } from './layout' // Doğru context import

import BlogList from '@/components/BlogList'

export default function CategoriesPage() {
  const categoryId = useContext(CategoryContext) // 🎯 context'ten id al

  return (
    <div className="categories-page">
      {categoryId ? (
        <BlogList categoryId={categoryId} />
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  )
}
