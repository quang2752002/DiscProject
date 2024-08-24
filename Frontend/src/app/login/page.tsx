'use client'
import React, { useState } from 'react'
import '@/app/login/page.css'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import showToast from '@/utils/showToast'
import { accountService } from '@/services/account.service'
import { useForm, SubmitHandler } from 'react-hook-form'
type LoginForm = {
  email: string
  password: string
  rememberMe: boolean
}

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()
  const router = useRouter()
  const [isShowPassword, setIsShowPassword] = useState(false)

  const handleSubmitLoginForm: SubmitHandler<LoginForm> = async (data) => {
    try {
      var response = await accountService.login(data)
      const { token, expiration } = response
      const expirationDate = new Date(expiration)
      Cookies.set('token', token, {
        expires: expirationDate,
      })
      router.push('/disc')
    } catch (err: any) {
      console.log(err)
      showToast('error', err.response?.data ?? 'Server error')
    }
  }
  return (
    <div className="wrapper">
      <div className="container-fluid full-height d-flex align-items-center justify-content-center">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-md-10 col-lg-5 col-xl-3">
            <form
              className="p-4 border rounded shadow bg-white"
              onSubmit={handleSubmit(handleSubmitLoginForm)}
            >
              <h4 className="text-center mb-4 form-title">Disc Store</h4>
              <div>
                <div className="form-group">
                  <label className="my-3 input-label">EMAIL:</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Invalid email',
                      },
                    })}
                    type="email"
                    className="form-control mb-3"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    // value={loginForm.email}
                    // onChange={(e) => handleSetLoginForm(e, 'email')}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="mb-3 input-label">PASSWORD:</label>
                  <div className="d-flex">
                    <input
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      type={isShowPassword ? 'text' : 'password'}
                      className="form-control mb-3 border-end-0 rounded-end-0 "
                      id="passwordInput"
                      placeholder="············"
                      // value={loginForm.password}
                      // onChange={(e) => handleSetLoginForm(e, 'password')}
                    />
                    <span
                      className="px-2 py-2 border border-start-0 rounded rounded-start-0 mb-3 text-center"
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye" />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </div>
                <div className="form-check">
                  <input
                    {...register('rememberMe')}
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    // onChange={(e) => handleSetLoginForm(e, 'rememberMe')}
                  />
                  <label className="form-check-label mb-3">Remember Me</label>
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-submit"
                    style={{ width: '100%' }}
                    // onClick={() => handleSubmitLoginForm()}
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
