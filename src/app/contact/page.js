'use client'
import '../../styles/contact.css'
import Header from '@/components/header'

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="static-page">
        <h1>İletişim</h1>
        <p>
          Bize ulaşmak için lütfen{' '}
          <a href="mailto:info@blogsite.com">info@blogsite.com</a> adresine e-posta gönderin.
        </p>
      </div>
    </>
  )
}
