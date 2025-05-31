import Link from 'next/link'
import Header from '../components/header'
import '../styles/home.css'

export default function Home() {
  return (
    <>
      <Header />
      <main className="main-content">
        <h1>Hoş Geldiniz - SAP Blog</h1>
      </main>
    </>
  )
}
