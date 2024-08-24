import React from 'react'
import '@/layouts/layout.css'
import Header from './../components/Header'
import Menu from './../components/Menu'
import Footer from '@/components/Footer'
import { getAuthor } from '@/utils/getAuthor'
import Authentication from '@/components/Authentication'
type LayoutProps = {
  onChangeSearchString: (value: string) => void
  children: React.ReactNode
}
const AdminLayout: React.FC<LayoutProps> = ({
  onChangeSearchString,
  children,
}: Readonly<LayoutProps>) => {
  const { currentUser } = getAuthor()
  return (
    <Authentication>
      <div
        className="layout-wrapper container-fluid"
        style={{ overflowX: 'hidden' }}
      >
        <div className="row layout-row">
          {/* Menu */}
          <div
            className="col-lg-2 col-md-0"
          >
            <Menu />
          </div>
          {/* Main */}
          <div className="col-lg-10 col-md-12">
            {/* wrapper */}
            <div className="wrapper container-fluid">
              <div className="row row-header">
                <Header
                  userName={currentUser?.name ?? ''}
                  onChangeSearchString={onChangeSearchString}
                />
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
    </Authentication>
  )
}

export default AdminLayout
