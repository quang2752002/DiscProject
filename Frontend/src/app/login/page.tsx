'use client'
import React, { useState } from 'react'
import '@/app/login/page.css'
import Link from 'next/link'
import axiosInstance from '@/api/axiosInstance'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import showToast from '@/utils/showToast'
type LoginForm = {
  email: string
  password: string
  rememberMe: boolean
}

const page = () => {
  const router = useRouter()
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleSetLoginForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof LoginForm
  ) => {
    let newLoginForm = { ...loginForm }
    if (key === 'rememberMe') newLoginForm[key] = !newLoginForm.rememberMe
    else newLoginForm[key] = event.target.value
    setLoginForm(newLoginForm)
  }
  const handleSubmitLoginForm = () => {
    axiosInstance
      .post('/user/login', loginForm)
      .then((response) => {
        const { token, expiration } = response.data
        const expirationDate = new Date(expiration)
        Cookies.set('token', token, {
          expires: expirationDate,
        })
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`
        router.push('/disc')
      })
      .catch((err) => {
        console.log(err)
        showToast('error', err.response?.data ?? 'Server error')
      })
  }
  return (
    <div className="wrapper">
      <div className="container-fluid full-height d-flex align-items-center justify-content-center">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-md-10 col-lg-5 col-xl-3">
            <form className="p-4 border rounded shadow bg-white">
              <h4 className="text-center mb-4 form-title">Disc Store</h4>
              <div>
                <div className="form-group">
                  <label className="my-3 input-label">EMAIL:</label>
                  <input
                    type="email"
                    className="form-control mb-3"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={loginForm.email}
                    onChange={(e) => handleSetLoginForm(e, 'email')}
                  />
                </div>
                <div className="form-group">
                  <label className="mb-3 input-label">PASSWORD:</label>
                  <div className="d-flex">
                    <input
                      type="password"
                      className="form-control mb-3 border-end-0 rounded-end-0"
                      id="exampleInputPassword1"
                      placeholder="············"
                      value={loginForm.password}
                      onChange={(e) => handleSetLoginForm(e, 'password')}
                    />
                    <span className="px-2 py-2 border border-start-0 rounded rounded-start-0 mb-3 text-center">
                      <i className="bi bi-eye px-2" />
                    </span>
                  </div>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={(e) => handleSetLoginForm(e, 'rememberMe')}
                  />
                  <label className="form-check-label mb-3">Remember Me</label>
                </div>
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-submit"
                    style={{ width: '100%' }}
                    onClick={() => handleSubmitLoginForm()}
                  >
                    Sign in
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    You do not have account?{' '}
                    <Link href="/register" className="redirect-register-link">
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
