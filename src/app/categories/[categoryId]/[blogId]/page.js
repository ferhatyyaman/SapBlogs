'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import '../../../../styles/blogdetail.css'

export default function BlogDetail() {
  const { blogId } = useParams()
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
    <div className="blog-detail-container">
    <article className="blog-detail">
      <h1>{blog.title}</h1>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>

    <aside className="blog-ad">
      {/* Reklam veya yan içerik buraya gelecek */}
      <h3>Reklam Alanı</h3>
      <p>Buraya istediğiniz reklam ya da ek içerik koyabilirsiniz.</p>
    </aside>
  </div>
  )
}
