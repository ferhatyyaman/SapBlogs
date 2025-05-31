'use client'

import React, { useState, useEffect } from 'react'
import { db } from '@/firebase/config'
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

import '../../../styles/dashboard-blogs.css'

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>,
})

export default function Blogs({ categoryId }) {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', content: '' })

  useEffect(() => {
    if (!categoryId) {
      setBlogs([])
      return
    }

    const fetchBlogs = async () => {
      const q = query(collection(db, 'blogs'), where('categoryId', '==', categoryId))
      const querySnapshot = await getDocs(q)
      const fetchedBlogs = []
      querySnapshot.forEach((docSnap) => {
        fetchedBlogs.push({ id: docSnap.id, ...docSnap.data() })
      })
      setBlogs(fetchedBlogs)
    }

    fetchBlogs()
  }, [categoryId])

  const handleAddBlog = async () => {
    if (!newBlog.title || !newBlog.content || !categoryId) {
      alert('Lütfen tüm alanları doldurun ve kategori seçin.')
      return
    }

    await addDoc(collection(db, 'blogs'), {
      ...newBlog,
      categoryId,
    })

    setNewBlog({ title: '', content: '' })

    // Yeni blog eklendikten sonra blogları yeniden çek
    const q = query(collection(db, 'blogs'), where('categoryId', '==', categoryId))
    const querySnapshot = await getDocs(q)
    const fetchedBlogs = []
    querySnapshot.forEach((docSnap) => {
      fetchedBlogs.push({ id: docSnap.id, ...docSnap.data() })
    })
    setBlogs(fetchedBlogs)
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'blogs', id))

    // Silme sonrası blogları tekrar getir
    const q = query(collection(db, 'blogs'), where('categoryId', '==', categoryId))
    const querySnapshot = await getDocs(q)
    const fetchedBlogs = []
    querySnapshot.forEach((docSnap) => {
      fetchedBlogs.push({ id: docSnap.id, ...docSnap.data() })
    })
    setBlogs(fetchedBlogs)
  }

  if (!categoryId) {
    return <p>Lütfen sol menüden bir kategori seçin.</p>
  }

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Başlık seviyeleri
    ['bold', 'italic', 'underline', 'strike', 'blockquote'], // Temel metin formatları
    [{ list: 'ordered' }, { list: 'bullet' }], // Listeler
    [{ indent: '-1' }, { indent: '+1' }], // Girintiler
    [{ direction: 'rtl' }], // Yazı yönü
    [{ size: ['small', false, 'large', 'huge'] }], // Yazı boyutu
    [{ color: [] }, { background: [] }], // Metin ve arka plan renkleri
    [{ font: [] }], // Yazı tipi
    [{ align: [] }], // Hizalama
    ['link', 'image', 'video'], // Link, görsel, video ekleme
    ['code-block'], // Kod bloğu
    ['clean'], // Format temizleme
  ]
  
  return (
    <div className="blogs-container">
      <h2 className="blogs-title">Yeni Blog Ekle</h2>
      <input
        type="text"
        placeholder="Başlık"
        value={newBlog.title}
        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        className="input-field"
      />

    <ReactQuill
      value={newBlog.content}
      onChange={(value) => setNewBlog({ ...newBlog, content: value })}
      theme="snow"
      placeholder="İçerik giriniz..."
      modules={{ toolbar: toolbarOptions }}
      className="quill-editor"
    />


      <button onClick={handleAddBlog} className="submit-button">
        Kaydet
      </button>

      <h2 className="blogs-title">Seçilen Kategoriye Ait Bloglar</h2>
      <div className="blogs-list">
        {blogs.length === 0 ? (
          <p>Bu kategoriye ait blog bulunamadı.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-item">
              <h3 className="blog-title">{blog.title}</h3>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <button onClick={() => handleDelete(blog.id)} className="delete-button">
                Sil
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
