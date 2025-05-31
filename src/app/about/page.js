'use client'
import '../../styles/about.css'
import Header from '@/components/header'

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="static-page">
        <h1>Hakkımızda</h1>
        <p>
          Bu blog platformu, kullanıcıların çeşitli konularda yazılarını paylaşabileceği
          basit ve kullanışlı bir alandır.
        </p>
      </div>
    </>
  )
}
