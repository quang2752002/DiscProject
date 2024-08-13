import React, { useEffect, useState } from 'react'
import '@/layouts/layout.css'
import Header from './../components/Header'
import Menu from './../components/Menu'
import Footer from '@/components/Footer'
import { getAuthor } from '@/utils/getAuthor'
import { useRouter } from 'next/navigation'
import showToast from '@/utils/showToast'
import ReactLoading from 'react-loading'
type LayoutProps = {
  children: React.ReactNode
}
const AdminLayout: React.FC<LayoutProps> = ({
  children,
}: Readonly<LayoutProps>) => {
  const router = useRouter()
  const { isAuthored, currentUser } = getAuthor()
  const [isAccessible, setIsAccessible] = useState<boolean>(false)
  useEffect(() => {
    if (!isAuthored) {
      showToast('error', 'Access denied')
      router.push('/login')
    } else {
      setIsAccessible(true)
    }
  }, [router])
  if (!isAccessible)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="mt-3">Loading...</div>
        </div>
      </div>
    )
  return (
    <div className="layout-wrapper">
      <div className="row layout-row">
        {/* Menu */}
        <Menu />
        {/* Main */}
        <div className="col-10">
          {/* wrapper */}
          <div className="wrapper container">
            <div className="row row-header">
              <Header userName={currentUser?.name ?? ''} />
            </div>
            <div className="row">
              <main className="main row-main">{children}</main>
            </div>
            <div className="row row-footer">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
