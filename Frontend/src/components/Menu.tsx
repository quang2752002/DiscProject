'use client'
import React, { useState } from 'react'
import Link from 'next/link'
const Menu: React.FC = () => {
  const [isShowMenuSub, setIsShowMenuSub] = useState<boolean>(false)
  return (
    <div className="col-2" style={{ height: '100%' }}>
      <div className="col-10 bg-white shadow" style={{ height: '100%' }}>
        <div className="brand menu-header">
          <h4>
            <strong>Disc Store</strong>
          </h4>
        </div>
        <div className="menu-list px-3">
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

            <li
              className="mb-5"
              onClick={() => setIsShowMenuSub(!isShowMenuSub)}
            >
              <Link href="/category" className="text-decoration-none menu-link">
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
              </Link>
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
          </menu>
        </div>
      </div>
    </div>
  )
}

export default Menu
