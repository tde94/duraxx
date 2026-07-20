'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import CookieBanner from './CookieBanner'

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <main className="flex-grow">{children}</main>
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20 lg:pt-24">{children}</main>
      <Footer />
      <CookieBanner />
    </>
  )
}
