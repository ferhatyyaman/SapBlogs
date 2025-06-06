'use client'
import Header from '../components/header'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import '../styles/home.css'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'

export default function Home() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, 'categories'))
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setCategories(fetched)
    }
    fetchCategories()
  }, [])

  return (
    <>
      <Header/>
      <main className="main-content">
        <Slider />

        <div className="grid-content">
          <h2>Kategoriler</h2>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link key={cat.id} href={`/categories/${cat.id}`}>
                <div className="category-card">
                  <h3>{cat.name}</h3>
                  <p>{cat.description?.slice(0, 80) || 'Açıklama yok'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
