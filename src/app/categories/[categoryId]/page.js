'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase/config'

export default function BlogList({ categoryId }) {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    async function fetchBlogs() {
      if (!categoryId) return

      const q = query(
        collection(db, 'blogs'),
        where('categoryId', '==', categoryId)  // kategoriye göre filtrele
      )
      const querySnapshot = await getDocs(q)

      const blogData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setBlogs(blogData)
    }

    fetchBlogs()
  }, [categoryId])

  if (blogs.length === 0) {
    return <p>Bu kategoriye ait blog bulunamadı.</p>
  }

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.content?.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  )
}
