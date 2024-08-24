'use client'
import React, { useState } from 'react'
import '@/app/login/page.css'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { accountService } from '@/services/account.service'
import showToast from '@/utils/showToast'

type RegisterForm = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  privacy: boolean
}

const Page = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>()

  const [isShowPassword, setIsShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmitForm: SubmitHandler<RegisterForm> = async (data) => {
    try {
      await accountService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
      showToast('success', 'Register successfully')
      const timer = setTimeout(() => {
        router.push('/login')
      }, 1000)
      return () => clearTimeout(timer)
    } catch (error: any) {
      console.log(error.message)
      showToast('error', 'Failed to register new account')
    }
  }

  return (
    <div className="wrapper">
      <div className="container-fluid full-height d-flex align-items-center justify-content-center">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-md-10 col-lg-5 col-xl-3">
            <form
              className="p-4 border rounded shadow bg-white"
              onSubmit={handleSubmit(handleSubmitForm)}
            >
              <h4 className="text-center mb-4 form-title">Disc Store</h4>
              <div>
                <div className="form-group">
                  <label className="my-3 input-label">FIRST NAME:</label>
                  <input
                    {...register('firstName', {
                      required: 'First name is required',
                      minLength: {
                        value: 2,
                        message: 'First name must be at least 2 characters',
                      },
                    })}
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-danger">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="my-3 input-label">LAST NAME:</label>
                  <input
                    {...register('lastName', {
                      required: 'Last name is required',
                      minLength: {
                        value: 2,
                        message: 'Last name must be at least 2 characters',
                      },
                    })}
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-danger">{errors.lastName.message}</p>
                  )}
                </div>
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
                    placeholder="Enter your email"
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
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                          message:
                            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                        },
                      })}
                      type={isShowPassword ? 'text' : 'password'}
                      className="form-control mb-3 border-end-0 rounded-end-0"
                      placeholder="············"
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
                <div className="form-group mb-2">
                  <label className="mb-3 input-label">CONFIRM PASSWORD:</label>
                  <div className="d-flex">
                    <input
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                          value === watch('password') ||
                          'Passwords do not match',
                      })}
                      type={isShowPassword ? 'text' : 'password'}
                      className="form-control mb-3 border-end-0 rounded-end-0"
                      placeholder="············"
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
                  {errors.confirmPassword && (
                    <p className="text-danger">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="form-check">
                  <input
                    {...register('privacy', {
                      required: 'Please agree to privacy policy & terms',
                    })}
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label mb-3">
                    I agree to{' '}
                    <span className="redirect-register-link">
                      privacy policy & terms
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="text-danger">{errors.privacy.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <button
                    className="btn btn-primary btn-submit"
                    style={{ width: '100%' }}
                  >
                    Sign in
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

export default Page
