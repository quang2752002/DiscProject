'use client'
import React, { useState } from 'react'
import '@/app/login/page.css'
import Link from 'next/link'
import axiosInstance from '@/api/axiosInstance'
import showToast from '@/utils/showToast'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
type registerForm = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
const page = () => {
  const [isCheckedPrivacy, setIsCheckedPrivacy] = useState<boolean>(false)
  const [isMatchedPassword, setIsMatchedPassword] = useState<boolean>(false)
  const [form, setForm] = useState<registerForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const router = useRouter()
  const handleSetForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof registerForm
  ) => {
    const newForm = { ...form }
    newForm[key] = event.target.value
    if (key === 'password' || key === 'confirmPassword') {
      setIsMatchedPassword(newForm.password === newForm.confirmPassword)
    }
    setForm(newForm)
  }
  const handleSubmitForm = () => {
    var formData = new FormData()
    formData.append('firstName', form.firstName)
    formData.append('lastName', form.lastName)
    formData.append('email', form.email)
    formData.append('password', form.password)
    axiosInstance
      .post('/user/add', formData)
      .then((response) => {
        showToast('success', 'Register successfully')
        const timer = setTimeout(() => {
          router.push('/login')
        }, 1000)
      })
      .catch((err) => {
        showToast('error', err.response.data)
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
                  <label className="my-3 input-label">FIRST NAME:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={(e) => handleSetForm(e, 'firstName')}
                  />
                </div>
                <div className="form-group">
                  <label className="my-3 input-label">LAST NAME:</label>
                  <input
                    type="TEXT"
                    className="form-control mb-3"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChange={(e) => handleSetForm(e, 'lastName')}
                  />
                </div>
                <div className="form-group">
                  <label className="my-3 input-label">EMAIL:</label>
                  <input
                    type="TEXT"
                    className="form-control mb-3"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => handleSetForm(e, 'email')}
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
                      value={form.password}
                      onChange={(e) => handleSetForm(e, 'password')}
                    />
                    <span className="px-2 py-2 border border-start-0 rounded rounded-start-0 mb-3 text-center">
                      <i className="bi bi-eye px-2" />
                    </span>
                  </div>
                </div>
                <div className="form-group mb-2">
                  <label className="mb-3 input-label">CONFIRM PASSWORD:</label>
                  <div className="d-flex">
                    <input
                      type="password"
                      className="form-control mb-3 border-end-0 rounded-end-0"
                      id="exampleInputPassword1"
                      placeholder="············"
                      value={form.confirmPassword}
                      onChange={(e) => handleSetForm(e, 'confirmPassword')}
                    />
                    <span className="px-2 py-2 border border-start-0 rounded rounded-start-0 mb-3 text-center">
                      <i className="bi bi-eye px-2" />
                    </span>
                  </div>
                  {form.password.length > 0 ||
                  form.confirmPassword.length > 0 ? (
                    <div>
                      {isMatchedPassword ? (
                        <small className="text-success">
                          Password is matched
                        </small>
                      ) : (
                        <small className="text-danger">
                          Password is not matched
                        </small>
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={() => setIsCheckedPrivacy(!isCheckedPrivacy)}
                  />
                  <label className="form-check-label mb-3">
                    I agree to{' '}
                    <span className="redirect-register-link">
                      privacy policy & terms
                    </span>
                  </label>
                </div>
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => handleSubmitForm()}
                    className="btn btn-primary btn-submit"
                    disabled={!isCheckedPrivacy || !isMatchedPassword}
                    style={{ width: '100%' }}
                  >
                    Submit
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    Already have an account?{' '}
                    <Link href="/login" className="redirect-register-link">
                      Sign in
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
