import React, { useState } from 'react'
type HeaderProps = {
  userName: string
  onChangeSearchString: (value: string) => void
}
const Navbar: React.FC<HeaderProps> = ({
  userName,
  onChangeSearchString,
}: HeaderProps) => {
  return (
    <header className="header bg-light mt-3 mb-4 ">
      <div className="wrapper-header d-flex justify-content-between align-items-center rounded shadow bg-white">
        <div className="search">
          <i className="bi bi-search mx-3" style={{ fontSize: '20px' }}></i>
          <input
            className="search-input border-0 px-1"
            type="text"
            placeholder="Search..."
            onChange={(e) => onChangeSearchString(e.target.value)}
          />
        </div>
        <div className="profile d-flex align-items-center">
          <span className="my-2 mx-4">
            <i>Welcome!</i> {userName}
          </span>
          <figure className="my-2">
            <img
              className="rounded-circle mx-3 "
              width="40em"
              src="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
              alt="avatar_user"
            />
          </figure>
        </div>
      </div>
    </header>
  )
}

export default Navbar
