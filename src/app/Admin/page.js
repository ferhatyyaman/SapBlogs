'use client'

import { useState } from 'react'
import Categories from './dashboard/categories'
import Blogs from './dashboard/blogs'
import '../../styles/admin-page.css'

export default function AdminPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  return (
    <div className="admin-layout">
      <Categories
        onSelectCategory={setSelectedCategoryId}
        selectedCategoryId={selectedCategoryId}
      />
      <main className="admin-main">
        <Blogs categoryId={selectedCategoryId} />
      </main>
    </div>
  )
}
