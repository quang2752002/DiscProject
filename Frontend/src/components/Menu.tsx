'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
const Menu: React.FC = () => {
  const [isShowMenuSub, setIsShowMenuSub] = useState<boolean>(false)
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }
  return (
    <div
      className="bg-white shadow navbar-expand-lg "
      style={{ height: '99%' }}
    >
      <div className="brand menu-header collapse navbar-collapse">
        <h4>
          <strong>Disc Store</strong>
        </h4>
      </div>
      <div className="menu-list px-3 collapse navbar-collapse">
        <menu>
          <li className="small text-uppercase">
            <span>Products</span>
            <hr />
          </li>
          <li className=" mb-3">
            <Link href="/disc" className="text-decoration-none menu-link">
              <i
                className="bi bi-table mx-2 py-2"
                style={{ fontSize: '20px' }}
              ></i>
              <span>Disc</span>
            </Link>
          </li>

          <li className="mb-5">
            <a
              className="text-decoration-none menu-link"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsShowMenuSub(!isShowMenuSub)}
            >
              <i
                className="bi bi bi-tags mx-2 py-2"
                style={{ fontSize: '20px' }}
              ></i>

              <span>Category & Type</span>
              {isShowMenuSub ? (
                <i className="bi small bi-chevron-down px-2"></i>
              ) : (
                <i className="bi  small bi-chevron-compact-right px-2"></i>
              )}
            </a>
            {isShowMenuSub ? (
              <ul className="menu-sub mt-3">
                <li className="mb-2">
                  <Link
                    href="/category"
                    className="menu-sub-link text-decoration-none"
                  >
                    Category
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/type"
                    className="menu-sub-link text-decoration-none"
                  >
                    Type
                  </Link>
                </li>
              </ul>
            ) : (
              ''
            )}
          </li>
          <li className="small text-uppercase ">
            <span>Transition</span>
            <hr />
          </li>
          <li className=" mb-5">
            <Link href="/order" className="text-decoration-none menu-link">
              <i
                className="bi bi-cash-coin mx-2 py-2"
                style={{ fontSize: '20px' }}
              ></i>
              <span>Order</span>
            </Link>
          </li>
          <li className="small text-uppercase ">
            <span>User</span>
            <hr />
          </li>
          <li className=" mb-3">
            <Link href="/account" className="text-decoration-none menu-link">
              <i
                className="bi  bi-person-fill mx-2 py-2"
                style={{ fontSize: '20px' }}
              ></i>
              <span>Account</span>
            </Link>
          </li>
          <li className=" mb-3">
            <Link href="/contact" className="text-decoration-none menu-link">
              <i
                className="bi bi-person-rolodex mx-2 py-2"
                style={{ fontSize: '20px' }}
              ></i>
              <span>Contact</span>
            </Link>
          </li>
          <div
            className="m-4 btn"
            style={{
              cursor: 'pointer',
            }}
            onClick={() => handleLogout()}
          >
            <Link href="" className="text-decoration-none" title="Logout">
              <i
                className="bi bi-box-arrow-in-right mx-2 py-2"
                style={{ fontSize: '34px' }}
              ></i>
            </Link>
          </div>
        </menu>
      </div>
    </div>
  )
}

export default Menu
