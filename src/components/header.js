import Link from 'next/link'
import '../styles/header.css'

export default function Header() {
  return (
    <header className="header">
      <nav className="nav-left">
      <Link href="/" className="nav-link">Bloglar</Link>
      </nav>

      <nav className="nav-right">
        <Link href="/categories" className="nav-link">Kategoriler</Link>
        <Link href="/contact" className="nav-link">İletişim</Link>
        <Link href="/about" className="nav-link">Hakkında</Link>
        <Link href="/admin-login" className="admin-link">
          Admin Giriş
        </Link>
      </nav>
    </header>
  )
}
