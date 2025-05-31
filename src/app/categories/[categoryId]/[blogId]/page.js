'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import '../../../../styles/blogdetail.css'

export default function BlogDetail() {
  const { blogId } = useParams()  // ✅ URL'den blogId al
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    async function fetchBlog() {
      const docRef = doc(db, 'blogs', blogId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setBlog({ id: docSnap.id, ...docSnap.data() })
      } else {
        setBlog(null)
      }
    }

    if (blogId) fetchBlog()
  }, [blogId])

  if (!blog) return <p>Blog bulunamadı.</p>

  return (
    <article className="blog-detail">
      <h1>{blog.title}</h1>
      <div className="blog-content">{blog.content}</div>
    </article>
  )
}
