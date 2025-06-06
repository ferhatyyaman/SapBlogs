'use client'

import Link from 'next/link'
import { useState } from 'react'
import '../styles/header.css'

export default function Header() {
  const [search, setSearch] = useState('')
  const [selectedPage, setSelectedPage] = useState('')

  // Sayfa linklerini ve isimlerini liste olarak tutuyoruz
  const pages = [
    { label: 'Anasayfa', href: '/' },
    { label: 'Kategoriler', href: '/categories' },
    { label: 'İletişim', href: '/contact' },
    { label: 'Hakkında', href: '/about' },
  ]

  function handlePageChange(e) {
    const href = e.target.value
    setSelectedPage(href)
    if (href) {
      window.location.href = href  // sayfaya yönlendir
    }
  }

  return (
    <header className="header">
      <nav className="nav-left">
        {/* Orijinal linkler */}
        <Link href="/" className="nav-link">Bloglar</Link>
        <Link href="/categories" className="nav-link">Kategoriler</Link>
        <Link href="/contact" className="nav-link">İletişim</Link>
        <Link href="/about" className="nav-link">Hakkında</Link>
      </nav>

      <div className="search-dropdown-container">
        <input
          type="text"
          placeholder="Ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {/* Sayfalar dropdown */}
        <select
          value={selectedPage}
          onChange={handlePageChange}
          className="page-dropdown"
        >
          <option value="">Sayfa Seç</option>
          {pages.map(page => (
            <option key={page.href} value={page.href}>
              {page.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  )
}
