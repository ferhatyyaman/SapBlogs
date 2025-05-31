'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Link from 'next/link'
import { db } from '@/firebase/config'
import '../styles/bloglist.css'

export default function BlogList({ categoryId }) {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    if (!categoryId) {
      setBlogs([])
      return
    }

    async function fetchBlogs() {
      const q = query(collection(db, 'blogs'), where('categoryId', '==', categoryId))
      const querySnapshot = await getDocs(q)
      const blogList = []
      querySnapshot.forEach(doc => blogList.push({ id: doc.id, ...doc.data() }))
      setBlogs(blogList)
    }

    fetchBlogs()
  }, [categoryId])

  if (blogs.length === 0) return <p>Bu kategoride blog bulunmamaktadır.</p>

  return (
    <ul className="blog-list">
      {blogs.map(blog => (
        <li key={blog.id} className="blog-item">
          <Link href={`/categories/${categoryId}/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
  )
}
