'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Link from 'next/link'
import { db } from '@/firebase/config'
import '../styles/bloglist.css'

function stripHtmlTags(html) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

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

  if (blogs.length === 0) return <p className="no-blogs">Bu kategoride blog bulunmamaktadır.</p>

  return (
    <div className="blog-grid">
      {blogs.map(blog => (
        <Link
          key={blog.id}
          href={`/categories/${categoryId}/${blog.id}`}
          className="blog-card-link"
          passHref
        >
          <div className="blog-card">
            <img
              src={blog.imageUrl || '/image/sap3.jpg'}
              alt={blog.title}
              className="blog-image"
            />
            <div className="blog-content">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">
                {stripHtmlTags(blog.content).substring(0, 100)}...
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
