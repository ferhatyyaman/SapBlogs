'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import '../../../styles/admin-page.css'

export default function Categories({ onSelectCategory, selectedCategoryId }) {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState('')

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(db, 'categories'))
    const cats = []
    querySnapshot.forEach((doc) => {
      cats.push({ id: doc.id, ...doc.data() })
    })
    setCategories(cats)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return
    await addDoc(collection(db, 'categories'), { name: newCategory })
    setNewCategory('')
    fetchCategories()
  }

  const handleDeleteCategory = async (id) => {
    await deleteDoc(doc(db, 'categories', id))
    fetchCategories()
    if (id === selectedCategoryId) {
      onSelectCategory(null)
    }
  }

  return (
    <aside className="admin-sidebar">
      <h2>Kategoriler</h2>
      <ul>
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={selectedCategoryId === cat.id ? 'active' : ''}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.name}
            <button onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id) }}>✖</button>
          </li>
        ))}
      </ul>
      <div className="admin-input-group">
        <input
          type="text"
          placeholder="Yeni kategori"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Ekle</button>
      </div>
    </aside>
  )
}