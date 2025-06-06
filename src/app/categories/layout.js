'use client'

import React, { useState, useEffect, createContext } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useRouter, usePathname } from 'next/navigation' // ✅ ekledik

import Header from '@/components/header'
import Footer from '@/components/footer'
import Categories from '@/components/Categories'
import '../../styles/categories.css'

export const CategoryContext = createContext()

export default function CategoriesLayout({ children }) {
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const router = useRouter()
  const pathname = usePathname() // ✅ şimdiki sayfayı kontrol etmek için

  useEffect(() => {
    async function fetchCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'))
        const cats = []
        querySnapshot.forEach(doc => cats.push({ id: doc.id, ...doc.data() }))
        setCategories(cats)
        if (cats.length > 0 && !selectedCategoryId) {
          setSelectedCategoryId(cats[0].id)
        }
      } catch (error) {
        console.error('Kategoriler alınırken hata oluştu:', error)
      }
    }
    fetchCategories()
  }, [])

  // ✅ Kategori seçimi ve yönlendirme
  function handleSelectCategory(id) {
    setSelectedCategoryId(id)

    // Eğer detay sayfasındaysa /categories sayfasına yönlendir
    if (pathname !== '/categories') {
      router.push('/categories')
    }
  }

  return (
    <>
      <Header />
      <div className="page-layout" style={{ display: 'flex', minHeight: '100vh' }}>
        <aside className="sidebar" style={{ width: '250px', borderRight: '1px solid #ddd', padding: 20 }}>
          <Categories
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
          />
        </aside>

        <main style={{ flex: 1, padding: 20 }}>
          <CategoryContext.Provider value={selectedCategoryId}>
            {selectedCategoryId ? (
              children
            ) : (
              <p>Lütfen sol menüden bir kategori seçin.</p>
            )}
          </CategoryContext.Provider>
        </main>
      </div>
      <Footer/>       
    </>
  )
}
